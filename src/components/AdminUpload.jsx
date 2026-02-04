import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, Image, BookOpen, GripVertical, X, Check, ArrowLeft } from 'lucide-react';

const API = 'http://localhost:3001/api';

const CATEGORIES = [
  { value: 'together', label: 'Insieme' },
  { value: 'travel', label: 'Viaggi' },
  { value: 'engagement', label: 'Fidanzamento' },
];

export default function AdminUpload() {
  const [manifest, setManifest] = useState({ gallery: [], story: [] });
  const [activeTab, setActiveTab] = useState('gallery');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchManifest = useCallback(async () => {
    try {
      const res = await fetch(`${API}/images`);
      const data = await res.json();
      setManifest(data);
    } catch {
      setMessage({ type: 'error', text: 'Server upload non raggiungibile. Avvia con: npm run upload' });
    }
  }, []);

  useEffect(() => {
    fetchManifest();
  }, [fetchManifest]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
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

  // Upload all pending files
  const uploadAll = async () => {
    if (pendingFiles.length === 0) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('type', activeTab);

      for (const pf of pendingFiles) {
        formData.append('images', pf.file);
        formData.append(`alt_${pf.file.name}`, pf.alt);
        formData.append(`category_${pf.file.name}`, pf.category);
        if (activeTab === 'story') {
          formData.append(`year_${pf.file.name}`, pf.year);
          formData.append(`title_${pf.file.name}`, pf.title);
          formData.append(`desc_${pf.file.name}`, pf.description);
        }
      }

      const res = await fetch(`${API}/upload`, { method: 'POST', body: formData });
      const data = await res.json();

      if (data.ok) {
        showMessage('success', `${data.uploaded.length} foto caricate!`);
        pendingFiles.forEach((pf) => URL.revokeObjectURL(pf.preview));
        setPendingFiles([]);
        fetchManifest();
      } else {
        showMessage('error', data.error || 'Errore durante il caricamento');
      }
    } catch (err) {
      showMessage('error', 'Errore di connessione al server');
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    if (!window.confirm('Eliminare questa foto?')) return;
    try {
      const res = await fetch(`${API}/images/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.ok) {
        showMessage('success', 'Foto eliminata');
        fetchManifest();
      }
    } catch {
      showMessage('error', 'Errore eliminazione');
    }
  };

  // Drag and drop handlers
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const images = manifest[activeTab] || [];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f5', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#3d3a37', color: '#f8f7f5', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <a
              href="/"
              style={{ color: '#d4a892', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}
            >
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
        {/* Message */}
        {message && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '16px',
              background: message.type === 'error' ? '#f8d7da' : '#d4edda',
              color: message.type === 'error' ? '#721c24' : '#155724',
              borderRadius: '4px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {message.type === 'success' ? <Check size={16} /> : <X size={16} />}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => { setActiveTab('gallery'); setPendingFiles([]); }}
            style={{
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'gallery' ? '#3d3a37' : '#e8e4df',
              color: activeTab === 'gallery' ? '#f8f7f5' : '#3d3a37',
              transition: 'all 0.2s',
            }}
          >
            <Image size={16} /> Galleria
          </button>
          <button
            onClick={() => { setActiveTab('story'); setPendingFiles([]); }}
            style={{
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'story' ? '#3d3a37' : '#e8e4df',
              color: activeTab === 'story' ? '#f8f7f5' : '#3d3a37',
              transition: 'all 0.2s',
            }}
          >
            <BookOpen size={16} /> La Nostra Storia
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-input').click()}
          style={{
            border: `2px dashed ${dragOver ? '#d4a892' : '#ccc'}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? '#fdf6f3' : '#fff',
            transition: 'all 0.2s',
            marginBottom: '24px',
          }}
        >
          <Upload size={32} style={{ color: '#999', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Trascina le foto qui o <span style={{ color: '#d4a892', textDecoration: 'underline' }}>clicca per selezionarle</span>
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#999' }}>
            JPG, PNG, WebP — max 20MB per file — le immagini vengono ottimizzate automaticamente
          </p>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Pending files */}
        {pendingFiles.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>
                {pendingFiles.length} foto da caricare
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    pendingFiles.forEach((pf) => URL.revokeObjectURL(pf.preview));
                    setPendingFiles([]);
                  }}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Annulla tutto
                </button>
                <button
                  onClick={uploadAll}
                  disabled={uploading}
                  style={{
                    padding: '8px 20px',
                    border: 'none',
                    background: uploading ? '#999' : '#d4a892',
                    color: '#fff',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {uploading ? 'Caricamento...' : 'Carica tutte'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {pendingFiles.map((pf, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    background: '#fff',
                    border: '1px solid #e8e4df',
                    borderRadius: '4px',
                    alignItems: 'flex-start',
                  }}
                >
                  <img
                    src={pf.preview}
                    alt=""
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, display: 'grid', gap: '8px', gridTemplateColumns: activeTab === 'story' ? '1fr 1fr' : '1fr 1fr' }}>
                    <div style={{ gridColumn: activeTab === 'story' ? '1 / -1' : 'auto' }}>
                      <label style={labelStyle}>Descrizione (alt text)</label>
                      <input
                        type="text"
                        value={pf.alt}
                        onChange={(e) => updatePending(index, 'alt', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    {activeTab === 'gallery' && (
                      <div>
                        <label style={labelStyle}>Categoria</label>
                        <select
                          value={pf.category}
                          onChange={(e) => updatePending(index, 'category', e.target.value)}
                          style={inputStyle}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {activeTab === 'story' && (
                      <>
                        <div>
                          <label style={labelStyle}>Anno</label>
                          <input
                            type="text"
                            value={pf.year}
                            onChange={(e) => updatePending(index, 'year', e.target.value)}
                            placeholder="es. 2019"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Titolo momento</label>
                          <input
                            type="text"
                            value={pf.title}
                            onChange={(e) => updatePending(index, 'title', e.target.value)}
                            placeholder="es. Il Primo Incontro"
                            style={inputStyle}
                          />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={labelStyle}>Racconto</label>
                          <textarea
                            value={pf.description}
                            onChange={(e) => updatePending(index, 'description', e.target.value)}
                            placeholder="Racconta questo momento..."
                            rows={2}
                            style={{ ...inputStyle, resize: 'vertical' }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => removePending(index)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px', flexShrink: 0 }}
                    title="Rimuovi"
                  >
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
            Nessuna foto caricata. Trascina le foto nell'area sopra per iniziare.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {images.map((img) => (
              <div
                key={img.id}
                style={{
                  position: 'relative',
                  background: '#fff',
                  border: '1px solid #e8e4df',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '8px 10px' }}>
                  <p style={{ margin: 0, fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
                    {img.alt}
                  </p>
                  {img.year && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#d4a892' }}>
                      {img.year} — {img.title}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteImage(img.id)}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Elimina"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  color: '#999',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '4px',
};

const inputStyle = {
  width: '100%',
  padding: '6px 10px',
  border: '1px solid #ddd',
  borderRadius: '3px',
  fontSize: '13px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};
