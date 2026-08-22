// src/components/UploadModal/UploadModal.jsx
import React, { useState } from 'react';
import './UploadModal.css';

export default function UploadModal({ onClose, lang }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Diccionario limpio, estético y sin emoticones
  const dictionary = {
    es: {
      ariaClose: 'Cerrar modal',
      prompt: 'Ingresa para cambiar la música.',
      placeholder: 'Ingresa la contraseña',
      btnEnter: 'Entrar',
      errorPass: 'Contraseña incorrecta verifica.',
      successMsg: 'Selecciona tu nuevo archivo MP3:',
      btnUpload: 'Cargar canción',
      uploading: 'Cargando canción...'
    },
    en: {
      ariaClose: 'Close modal',
      prompt: 'Log in to change the music.',
      placeholder: 'Enter the password',
      btnEnter: 'Enter',
      errorPass: 'Incorrect password, verify.',
      successMsg: 'Welcome! Select your new MP3 file:',
      btnUpload: 'Upload song',
      uploading: 'Uploading song...'
    }
  };

  const t = dictionary[lang] || dictionary.es;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'chocoflana') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(t.errorPass);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'audio/mpeg' && !file.name.endsWith('.mp3')) {
        alert("¡Solo MP3, por favor!");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('password', password);

    try {
      // Recuerda cambiar esta URL por la de tu servidor real cuando lo montes
      const response = await fetch('https://marcos.creamoscodigo.com/devsastroso/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        onClose(); 
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error('Error al subir:', error);
      alert('Error de conexión con el servidor.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <button className="modal-close-btn" onClick={onClose} aria-label={t.ariaClose}>
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span 
            className="material-symbols-outlined" 
            style={{ fontSize: '3.5rem', fontWeight: '300', opacity: 0.8 }}
          >
            audio_file
          </span>
        </div>
        
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="modal-form">
            <p className="modal-text">{t.prompt}</p>
            <input 
              type="password" 
              className="modal-input"
              placeholder={t.placeholder}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            
            <button type="submit" className="btn-submit">{t.btnEnter}</button>
          </form>
        ) : (
          <div className="modal-upload-area">
            <p className="modal-text">{t.successMsg}</p>
            <input 
              type="file" 
              accept="audio/mp3" 
              onChange={handleFileSelect} 
              className="file-input"
            />

            {selectedFile && (
              <button 
                className="btn-submit" 
                onClick={handleUpload}
                disabled={isUploading}
                style={{ marginTop: '1rem', opacity: isUploading ? 0.5 : 1 }}
              >
                {isUploading ? t.uploading : t.btnUpload}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}