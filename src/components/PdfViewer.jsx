// src/components/PdfViewer.jsx
import { useState, useEffect } from 'react';

export default function PdfViewer({ file }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraire le nom du fichier à partir du chemin
  const getFileName = (path) => {
    // Si c'est une URL, extraire le dernier segment
    if (path.startsWith('http')) {
      const segments = path.split('/');
      return segments[segments.length - 1];
    }
    // Sinon, extraire le nom du fichier du chemin local
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  const fileName = getFileName(file);

  // Fonction pour basculer l'affichage du PDF
  const togglePdf = () => {
    setIsPdfOpen(!isPdfOpen);
    // Fermer le modal si on ferme le PDF
    if (isModalOpen && isPdfOpen) {
      setIsModalOpen(false);
    }
  };

  // Fonction pour ouvrir le PDF en modal
  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  // Fonction pour fermer le modal quand on clique en dehors
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  };

  // Effet pour gérer la touche Échap pour fermer le PDF ou le modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          closeModal();
        } else if (isPdfOpen) {
          setIsPdfOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isPdfOpen, isModalOpen]);

  // Effet pour empêcher le défilement du body quand le modal est ouvert
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="pdf-viewer-container">
      <div
        className="pdf-link-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pdf-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
            <path fill="currentColor" d="M181.9 256.1c-5.1-9.9-9.1-19.4-11.3-28.8-4.8-19.9-2.4-34.8 6.9-43.1 6.8-6.1 16.7-8.4 29.2-6.8 11.3 1.5 22.8 5.5 34.6 11.9 11 6 22.1 14.1 33.6 24.4 10.5-1.2 21.3-1.8 32.4-1.8 11.3 0 22.4 .6 33.3 1.9-3.5-5.7-7.2-11.1-11.1-16.2-9.1-12-19.2-22.9-30.5-32.8-13.5-11.9-28.1-22-44.1-30.1-16.5-8.4-33.9-14.7-52.1-18.6-34.9-7.6-65.7-5.1-91.2 7.5-25.5 12.6-43.8 33.7-54.8 63.5-10.9 29.5-13.2 61.5-6.9 95.9 6.4 34.9 19.9 65.9 40.2 93.1 20.9 27.9 46.9 51.2 78.1 70.1 31.2 18.9 66.4 33.1 105.7 42.5 10.6-8.5 20.6-17.7 30.1-27.5 9.4-9.8 18.1-20.2 26.2-31.2-13.8-3.1-26.8-7.2-39-12.4-23.5-9.9-45.2-22.6-65.2-38.3-18.7-14.7-34.7-31.6-48.2-50.7-13.5-19.1-23.5-39.6-30.1-61.5-6.5-21.8-9.6-44.1-9.2-66.9 .4-22.7 4.2-44.1 11.3-64.1 13.3 8.6 25.2 19.1 35.8 31.5 10.6 12.4 19.7 26.3 27.4 41.7 7.7 15.3 13.5 31.8 17.5 49.2 3.6 15.9 5.3 31.9 5 48-10.3-10.2-20.2-18.9-29.9-26.1-11.8-8.7-23.3-15.1-34.5-19.2-15.8-5.8-30-6.2-42.6-1.3-16.2 6.3-27.8 20.1-34.8 41.3-7 21.2-8.1 46.6-3.3 76.2 1.6 9.9 4 20.2 7.1 31z"/>
          </svg>
        </div>
        <div className="pdf-info">
          <span className="pdf-name">{fileName}</span>
          <div className="pdf-buttons">
            <button
              className="pdf-open-button"
              onClick={togglePdf}
              style={{
                backgroundColor: isHovered ? '#0056b3' : '#007bff'
              }}
            >
              {isPdfOpen ? 'Fermer le PDF' : 'Ouvrir le PDF'}
            </button>
            {isPdfOpen && (
              <button
                className="pdf-modal-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                title="Agrandir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {isPdfOpen && !isModalOpen && (
        <div className="pdf-embed-container">
          <div className="pdf-embed-header">
            <span className="pdf-embed-title">{fileName}</span>
            <div className="pdf-embed-controls">
              <button
                className="pdf-control-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                title="Agrandir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
              <button
                className="pdf-control-button"
                onClick={togglePdf}
                title="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>
          <iframe
            src={file}
            className="pdf-iframe"
            title={fileName}
            style={{ border: 'none' }}
          ></iframe>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={handleModalBackdropClick}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{fileName}</h3>
              <button
                className="modal-close-button"
                onClick={closeModal}
                title="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <iframe
                src={file}
                className="modal-iframe"
                title={fileName}
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .pdf-viewer-container {
          margin: 1rem 0;
          position: relative;
        }

        .pdf-link-container {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .pdf-link-container:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-color: #ccc;
        }

        .pdf-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: #e74c3c;
        }

        .pdf-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pdf-name {
          font-size: 1rem;
          font-weight: 500;
          color: #333;
          margin-right: 1rem;
        }

        .pdf-buttons {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .pdf-open-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .pdf-open-button:hover {
          background-color: #0056b3;
        }

        .pdf-modal-button {
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .pdf-modal-button:hover {
          background-color: #5a6268;
        }

        /* Styles pour l'affichage du PDF */
        .pdf-embed-container {
          margin-top: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          height: 500px;
          display: flex;
          flex-direction: column;
        }

        .pdf-embed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #ddd;
        }

        .pdf-embed-title {
          font-weight: 500;
          color: #333;
        }

        .pdf-embed-controls {
          display: flex;
          gap: 0.5rem;
        }

        .pdf-control-button {
          background-color: transparent;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #555;
        }

        .pdf-control-button:hover {
          background-color: #f0f0f0;
          color: #333;
        }

        .pdf-iframe {
          flex: 1;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Styles pour le modal */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-content {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 1000px;
          height: 80vh;
          max-height: 800px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #ddd;
        }

        .modal-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: #333;
        }

        .modal-close-button {
          background-color: transparent;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #666;
          transition: all 0.2s ease;
        }

        .modal-close-button:hover {
          background-color: #f0f0f0;
          color: #333;
        }

        .modal-body {
          flex: 1;
          overflow: hidden;
        }

        .modal-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Styles pour les appareils mobiles */
        @media (max-width: 768px) {
          .pdf-link-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .pdf-icon {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }

          .pdf-info {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
          }

          .pdf-name {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }

          .pdf-buttons {
            width: 100%;
          }

          .pdf-open-button {
            flex: 1;
            text-align: center;
          }

          .pdf-embed-container {
            height: 400px;
          }

          .modal-content {
            width: 95%;
            height: 90vh;
          }
        }
      `}</style>
    </div>
  );
}
