import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3001;
const GALLERY_DIR = join(__dirname, 'public', 'images', 'gallery');
const MANIFEST_PATH = join(GALLERY_DIR, 'manifest.json');

// Multer config — temp storage, we process with sharp before saving
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo immagini ammesse'));
    }
  },
});

function readManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    return { gallery: [], story: [] };
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
}

function writeManifest(data) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(data, null, 2));
}

const app = express();
app.use(express.json());

// CORS for Vite dev server
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// GET manifest
app.get('/api/images', (_req, res) => {
  res.json(readManifest());
});

// POST upload — type: "gallery" or "story"
app.post('/api/upload', upload.array('images', 20), async (req, res) => {
  try {
    const type = req.body.type || 'gallery';
    const manifest = readManifest();
    const results = [];

    for (const file of req.files) {
      const timestamp = Date.now();
      const slug = file.originalname
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .toLowerCase();
      const filename = `${type}-${slug}-${timestamp}.webp`;
      const filepath = join(GALLERY_DIR, filename);

      // Optimize with sharp: resize to max 1600px wide, webp 82% quality
      await sharp(file.buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(filepath);

      const entry = {
        id: `${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
        src: `/images/gallery/${filename}`,
        alt: req.body[`alt_${file.originalname}`] || slug.replace(/-/g, ' '),
        category: req.body[`category_${file.originalname}`] || 'together',
        uploadedAt: new Date().toISOString(),
      };

      if (type === 'story') {
        entry.year = req.body[`year_${file.originalname}`] || '';
        entry.title = req.body[`title_${file.originalname}`] || '';
        entry.description = req.body[`desc_${file.originalname}`] || '';
      }

      manifest[type].push(entry);
      results.push(entry);
    }

    writeManifest(manifest);
    res.json({ ok: true, uploaded: results });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE image
app.delete('/api/images/:id', (req, res) => {
  const manifest = readManifest();
  let found = null;
  let foundType = null;

  for (const type of ['gallery', 'story']) {
    const idx = manifest[type].findIndex((img) => img.id === req.params.id);
    if (idx !== -1) {
      found = manifest[type][idx];
      foundType = type;
      manifest[type].splice(idx, 1);
      break;
    }
  }

  if (!found) {
    return res.status(404).json({ error: 'Immagine non trovata' });
  }

  // Delete file from disk
  const filepath = join(__dirname, 'public', found.src);
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }

  writeManifest(manifest);
  res.json({ ok: true, deleted: found });
});

// Update image metadata
app.post('/api/images/:id', (req, res) => {
  const manifest = readManifest();

  for (const type of ['gallery', 'story']) {
    const img = manifest[type].find((i) => i.id === req.params.id);
    if (img) {
      if (req.body.alt !== undefined) img.alt = req.body.alt;
      if (req.body.category !== undefined) img.category = req.body.category;
      if (req.body.year !== undefined) img.year = req.body.year;
      if (req.body.title !== undefined) img.title = req.body.title;
      if (req.body.description !== undefined) img.description = req.body.description;
      writeManifest(manifest);
      return res.json({ ok: true, updated: img });
    }
  }

  res.status(404).json({ error: 'Immagine non trovata' });
});

// Reorder images
app.post('/api/images/reorder/:type', (req, res) => {
  const { type } = req.params;
  const { ids } = req.body;
  const manifest = readManifest();

  if (!manifest[type]) {
    return res.status(400).json({ error: 'Tipo non valido' });
  }

  const reordered = ids
    .map((id) => manifest[type].find((img) => img.id === id))
    .filter(Boolean);

  manifest[type] = reordered;
  writeManifest(manifest);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`\n  Upload server attivo su http://localhost:${PORT}`);
  console.log(`  Pannello admin: http://localhost:5173/#/gestione-foto-ed2026\n`);
});
