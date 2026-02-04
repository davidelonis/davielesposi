import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, Image, BookOpen, X, Check, ArrowLeft } from 'lucide-react';
import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  cloudinaryListUrl,
  cloudinaryImageUrl,
  cloudinaryThumbUrl,
  TAGS,
  getContext,
} from '../config/cloudinary';

const CATEGORIES = [
  { value: 'together', label: 'Insieme' },
  { value: 'travel', label: 'Viaggi' },
  { value: 'engagement', label: 'Fidanzamento' },
];

const isConfigured = true; // Cloudinary is configured via Netlify env vars

export default function AdminUpload() {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('gallery');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!isConfigured) return;
    try {
      const tag = activeTab === 'gallery' ? TAGS.GALLERY : TAGS.STORY;
      const res = await fetch(cloudinaryListUrl(tag));
      if (!res.ok) {
        if (res.status === 404) {
          setImages([]);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const imgs = (data.resources || []).map((r) => {
        const meta = getContext(r);
        return {
          id: r.public_id,
          src: cloudinaryImageUrl(r.public_id),
          thumb: cloudinaryThumbUrl(r.public_id),
          alt: meta.alt || r.public_id.split('/').pop(),
          category: meta.category,
          year: meta.year,
          title: meta.title,
          description: meta.description,
          uploadedAt: r.created_at,
        };
      });
      setImages(imgs);
    } catch {
      // 404 means no images with this tag yet — not an error
      setImages([]);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Handle file selection
  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      category: 'together',
      year: '',
      title: '',
      description: '',
    }));
    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const removePending = (index) => {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const updatePending = (index, field, value) => {
    setPendingFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  // Sanitize context values (no pipes or equals allowed)
  const sanitize = (str) => str.replace(/[|=]/g, ' ').trim();

  // Upload all pending files to Cloudinary
  const uploadAll = async () => {
    if (pendingFiles.length === 0 || !isConfigured) return;
    setUploading(true);
    const results = [];

    try {
      for (let i = 0; i < pendingFiles.length; i++) {
        const pf = pendingFiles[i];
        setUploadProgress(`${i + 1} di ${pendingFiles.length}...`);

        const formData = new FormData();
        formData.append('file', pf.file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', `wedding/${activeTab}`);

        const tag = activeTab === 'gallery' ? TAGS.GALLERY : TAGS.STORY;
        formData.append('tags', tag);

        // Context metadata
        const ctx = [`alt=${sanitize(pf.alt)}`, `category=${sanitize(pf.category)}`];
        if (activeTab === 'story') {
          ctx.push(`year=${sanitize(pf.year)}`);
          ctx.push(`title=${sanitize(pf.title)}`);
          ctx.push(`description=${sanitize(pf.description)}`);
        }
        formData.append('context', ctx.join('|'));

        const res = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.secure_url) {
          results.push({
            id: data.public_id,
            src: cloudinaryImageUrl(data.public_id),
            thumb: cloudinaryThumbUrl(data.public_id),
            alt: pf.alt,
            category: pf.category,
            year: pf.year,
            title: pf.title,
            description: pf.description,
          });
        } else {
          throw new Error(data.error?.message || 'Upload fallito');
        }
      }

      showMessage('success', `${results.length} foto caricate!`);
      pendingFiles.forEach((pf) => URL.revokeObjectURL(pf.preview));
      setPendingFiles([]);
      setUploadProgress('');

      // Optimistically add to local state (CDN cache refreshes in ~60s)
      setImages((prev) => [...prev, ...results]);
    } catch (err) {
      showMessage('error', `Errore: ${err.message}`);
      setUploadProgress('');
    } finally {
      setUploading(false);
    }
  };

  // Delete image via Netlify function
  const deleteImage = async (publicId) => {
    if (!window.confirm('Eliminare questa foto?')) return;
    try {
      const res = await fetch('/.netlify/functions/cloudinary-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId }),
      });
      if (res.ok) {
        showMessage('success', 'Foto eliminata');
        setImages((prev) => prev.filter((img) => img.id !== publicId));
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Errore eliminazione');
      }
    } catch {
      showMessage('error', 'Funzione di eliminazione non disponibile. Elimina da Cloudinary dashboard.');
    }
  };

  // Drag and drop handlers
  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f5', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#3d3a37', color: '#f8f7f5', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <a href="/" style={{ color: '#d4a892', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <ArrowLeft size={14} /> Torna al sito
            </a>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 400, fontFamily: 'Cormorant Garamond, serif' }}>
              Gestione Foto
            </h1>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>
            {images.length} foto in {activeTab === 'gallery' ? 'galleria' : 'storia'}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
        {/* Config warning - Cloudinary is configured */}

        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px', marginBottom: '16px',
            background: message.type === 'error' ? '#f8d7da' : '#d4edda',
            color: message.type === 'error' ? '#721c24' : '#155724',
            borderRadius: '4px', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            {message.type === 'success' ? <Check size={16} /> : <X size={16} />}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { key: 'gallery', label: 'Galleria', icon: Image },
            { key: 'story', label: 'La Nostra Storia', icon: BookOpen },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setPendingFiles([]); }}
              style={{
                padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: activeTab === key ? '#3d3a37' : '#e8e4df',
                color: activeTab === key ? '#f8f7f5' : '#3d3a37',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-input').click()}
          style={{
            border: `2px dashed ${dragOver ? '#d4a892' : '#ccc'}`,
            borderRadius: '8px', padding: '40px', textAlign: 'center',
            cursor: isConfigured ? 'pointer' : 'not-allowed',
            background: dragOver ? '#fdf6f3' : '#fff',
            transition: 'all 0.2s', marginBottom: '24px',
            opacity: isConfigured ? 1 : 0.5,
          }}
        >
          <Upload size={32} style={{ color: '#999', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Trascina le foto qui o <span style={{ color: '#d4a892', textDecoration: 'underline' }}>clicca per selezionarle</span>
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#999' }}>
            JPG, PNG, WebP — le immagini vengono ottimizzate automaticamente da Cloudinary
          </p>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
            disabled={!isConfigured}
          />
        </div>

        {/* Pending files */}
        {pendingFiles.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>
                {pendingFiles.length} foto da caricare
              </h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {uploadProgress && (
                  <span style={{ fontSize: '12px', color: '#999' }}>{uploadProgress}</span>
                )}
                <button
                  onClick={() => { pendingFiles.forEach((pf) => URL.revokeObjectURL(pf.preview)); setPendingFiles([]); }}
                  style={{ padding: '8px 16px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '12px' }}
                >
                  Annulla
                </button>
                <button
                  onClick={uploadAll}
                  disabled={uploading}
                  style={{
                    padding: '8px 20px', border: 'none',
                    background: uploading ? '#999' : '#d4a892', color: '#fff',
                    cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: 500,
                  }}
                >
                  {uploading ? 'Caricamento...' : 'Carica tutte'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {pendingFiles.map((pf, index) => (
                <div key={index} style={{
                  display: 'flex', gap: '16px', padding: '16px', background: '#fff',
                  border: '1px solid #e8e4df', borderRadius: '4px', alignItems: 'flex-start',
                }}>
                  <img src={pf.preview} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr' }}>
                    <div style={{ gridColumn: activeTab === 'story' ? '1 / -1' : 'auto' }}>
                      <label style={labelStyle}>Descrizione (alt text)</label>
                      <input type="text" value={pf.alt} onChange={(e) => updatePending(index, 'alt', e.target.value)} style={inputStyle} />
                    </div>
                    {activeTab === 'gallery' && (
                      <div>
                        <label style={labelStyle}>Categoria</label>
                        <select value={pf.category} onChange={(e) => updatePending(index, 'category', e.target.value)} style={inputStyle}>
                          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                    )}
                    {activeTab === 'story' && (
                      <>
                        <div>
                          <label style={labelStyle}>Anno</label>
                          <input type="text" value={pf.year} onChange={(e) => updatePending(index, 'year', e.target.value)} placeholder="es. 2019" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Titolo momento</label>
                          <input type="text" value={pf.title} onChange={(e) => updatePending(index, 'title', e.target.value)} placeholder="es. Il Primo Incontro" style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>Racconto</label>
                          <textarea value={pf.description} onChange={(e) => updatePending(index, 'description', e.target.value)} placeholder="Racconta questo momento..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                      </>
                    )}
                  </div>
                  <button onClick={() => removePending(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px', flexShrink: 0 }} title="Rimuovi">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded images */}
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '16px' }}>
          {activeTab === 'gallery' ? 'Foto in Galleria' : 'Foto della Storia'} ({images.length})
        </h3>

        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999', fontSize: '13px' }}>
            {isConfigured
              ? 'Nessuna foto caricata. Trascina le foto nell\'area sopra per iniziare.'
              : 'Configura Cloudinary per iniziare.'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {images.map((img) => (
              <div key={img.id} style={{ position: 'relative', background: '#fff', border: '1px solid #e8e4df', borderRadius: '4px', overflow: 'hidden' }}>
                <img src={img.thumb} alt={img.alt} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '8px 10px' }}>
                  <p style={{ margin: 0, fontSize: '11px', color: '#666', lineHeight: 1.4 }}>{img.alt}</p>
                  {img.year && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#d4a892' }}>
                      {img.year} — {img.title}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteImage(img.id)}
                  style={{
                    position: 'absolute', top: '6px', right: '6px', width: '28px', height: '28px',
                    borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  title="Elimina"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Info note */}
        <div style={{ marginTop: '32px', padding: '16px', background: '#e8f4fd', borderRadius: '4px', fontSize: '12px', color: '#1a5276', lineHeight: 1.6 }}>
          <strong>Note:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>Le foto vengono caricate direttamente su Cloudinary (CDN globale)</li>
            <li>Dopo il caricamento, le foto potrebbero impiegare fino a 60 secondi per apparire sul sito pubblico</li>
            <li>Le immagini vengono ottimizzate automaticamente (formato WebP, ridimensionamento)</li>
            <li>Non serve fare redeploy del sito: le foto appaiono automaticamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '11px', color: '#999',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px',
};

const inputStyle = {
  width: '100%', padding: '6px 10px', border: '1px solid #ddd',
  borderRadius: '3px', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box',
};
