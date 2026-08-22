// src/components/MsnMessenger/MsnMessenger.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaInstagram, FaUserFriends, FaMugHot, FaPaperPlane } from 'react-icons/fa'; 
import emailjs from '@emailjs/browser'; 
import './MsnMessenger.css';

const MsnMessenger = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showKiss, setShowKiss] = useState(false); 
  
  const [chatHistory, setChatHistory] = useState([]); 
  const [chatStep, setChatStep] = useState(0); 
  const [userData, setUserData] = useState({ name: '', need: '', email: '' }); 
  const [lastMessageTime, setLastMessageTime] = useState('');

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [userStyle, setUserStyle] = useState({ fontFamily: 'Arial', color: '#000000' }); 

  const zumbidoRef = useRef(null);
  const besoRef = useRef(null);
  const chatEndRef = useRef(null); 
  const hasGreeted = useRef(false); 

  const emojis = ['🙂', '😂', '😍', '😎', '😜', '😡', '😭', '❤️', '👍', '👎'];

  useEffect(() => {
    // Cargamos los audios desde la carpeta public
    zumbidoRef.current = new Audio('/zumbido-msn.mp3');
    besoRef.current = new Audio('/beso-msn.mp3');

    if (!hasGreeted.current) {
      hasGreeted.current = true;
      setTimeout(() => {
        addMessage('Marcos', 'Hola, ¿cómo te llamas?');
      }, 1000);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const now = new Date();
    const fecha = now.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setLastMessageTime(`${fecha} a las ${hora}`);
  }, [chatHistory]);

  const addMessage = (sender, text, msgStyle = {}) => {
    setChatHistory(prev => [...prev, { sender, text, style: msgStyle }]);
  };

  const handleSend = () => {
    if (!message.trim() || chatStep === 3) return; 

    const userMsg = message.trim();
    addMessage('Visitante', userMsg, userStyle); 
    setMessage(''); 
    setShowEmojiPicker(false); 
    setShowFontPicker(false);

    setTimeout(() => {
      if (chatStep === 0) {
        setUserData(prev => ({ ...prev, name: userMsg }));
        addMessage('Marcos', `Mucho gusto ${userMsg}, ¿de qué necesitas o en qué te puedo ayudar hoy?`);
        setChatStep(1);
      } 
      else if (chatStep === 1) {
        setUserData(prev => ({ ...prev, need: userMsg }));
        addMessage('Marcos', 'Me parece perfecto, ¿por qué no me pasas tu correo y te contacto por ahí?');
        setChatStep(2);
      } 
      else if (chatStep === 2) {
        if (userMsg.includes('@') && userMsg.includes('.')) {
          const finalUserData = { ...userData, email: userMsg };
          setUserData(finalUserData);
          
          addMessage('Marcos', 'Gracias, me tengo que ir pero ya recibí tus datos y lo más pronto posible recibirás un correo mío!!!! saludos y gracias por visitar este DEVsastre!!');
          
          emailjs.send(
            'service_xh1ie0q',      // TU SERVICE ID
            'template_1x2rvkg',     // TU TEMPLATE ID
            {
              name: finalUserData.name,
              need: finalUserData.need,
              email: finalUserData.email
            },
            'k5GBDL7D8Y7mMAxVm'       // TU PUBLIC KEY
          ).then((response) => {
            console.log('¡Correo enviado con éxito!', response.status, response.text);
            setTimeout(() => {
              addMessage('Sistema', 'Gracias por usar la forma de contacto. Tu correo fue recibido correctamente.');
              setChatStep(3); 
            }, 1500);
          }).catch((err) => {
            console.log('Error al enviar correo:', err);
            setTimeout(() => {
              addMessage('Sistema', 'Hubo un error al enviar tu correo. Por favor intenta más tarde o contáctame por otra red.');
              setChatStep(3); 
            }, 1500);
          });

        } else {
          addMessage('Marcos', 'Ey, ese correo no se ve muy real, no me quieras engañar. Pásame uno válido:');
        }
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const mandarZumbido = () => {
    setIsShaking(true);
    if (zumbidoRef.current) {
      zumbidoRef.current.currentTime = 0;
      zumbidoRef.current.play().catch(err => console.log(err));
    }
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
    setTimeout(() => setIsShaking(false), 500);
  };

  const mandarBeso = () => {
    setShowKiss(true);
    if (besoRef.current) {
      besoRef.current.currentTime = 0;
      besoRef.current.play().catch(err => console.log(err));
    }
    setTimeout(() => setShowKiss(false), 1500); 
  };

  return (
    <>
      {showKiss && (
        <div className="msn-kiss-overlay">
          <div className="msn-giant-kiss">💋</div>
        </div>
      )}

      <div className="msn-modal-overlay">
        <div className={`msn-window ${isShaking ? 'zumbido-activo' : ''}`}>
          
          {/* --- PANTALLA DE ÉXITO FLOTANTE (Ahora cubre TODA la ventana) --- */}
          {chatStep === 3 && (
            <div className="msn-success-screen">
              <div className="plane-icon-container">
                <FaPaperPlane />
              </div>
              <h3>¡Correo Enviado!</h3>
              <p>Tu mensaje va volando hacia la bandeja de Marcos.</p>
              <button className="msn-close-btn-big" onClick={onClose}>Cerrar Ventana</button>
            </div>
          )}

          <div className="msn-title-bar">
            <div className="msn-title-left">
              <img src="/no-line.png" alt="MSN Icon" className="msn-icon-img" />
              <span>Marcos ({chatStep === 3 ? 'Correo Enviado' : 'Conectado'}) - Conversación</span>
            </div>
            <div className="msn-title-right">
              <button className="msn-btn-min">_</button>
              <button className="msn-btn-max">□</button>
              <button className="msn-btn-close" onClick={onClose}>X</button>
            </div>
          </div>

          <div className="msn-menu-bar">
            <span>Archivo</span>
            <span>Edición</span>
            <span>Acciones</span>
            <span>Herramientas</span>
            <span>Ayuda</span>
          </div>

          <div className="msn-content">
            
            {/* AQUÍ YA NO NECESITAMOS EL style={{ position: 'relative' }} */}
            <div className="msn-chat-section">
              
              <div className="msn-history-area">
                <div className="msn-message-info">
                  Nunca des tu contraseña o número de tarjeta de crédito en una conversación de mensajería instantánea.
                </div>
                
                {chatHistory.map((msg, index) => (
                  <div key={index} className={msg.sender === 'Sistema' ? 'msn-system-msg' : 'msn-message-row'}>
                    {msg.sender === 'Sistema' ? (
                      <span>{msg.text}</span>
                    ) : (
                      <>
                        <span className={msg.sender === 'Marcos' ? 'msn-sender-marcos' : 'msn-sender-visitante'}>
                          {msg.sender} dice:
                        </span>
                        <span className="msn-message-text" style={msg.style || {}}>{msg.text}</span>
                      </>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="msn-toolbar" style={{ position: 'relative' }}>
                <button 
                  title="Fuente" 
                  onClick={() => { setShowFontPicker(!showFontPicker); setShowEmojiPicker(false); }}>
                  A
                </button>
                <button 
                  title="Emoticonos" 
                  onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowFontPicker(false); }}>
                  🙂
                </button>
                <button title="Zumbido" className="zumbido-btn" onClick={mandarZumbido}>🔔</button>
                <button title="Beso Gigante" onClick={mandarBeso}>💋</button>

                {showEmojiPicker && (
                  <div className="msn-popup-menu emoji-picker">
                    {emojis.map(e => (
                      <span key={e} onClick={() => handleEmojiClick(e)}>{e}</span>
                    ))}
                  </div>
                )}

                {showFontPicker && (
                  <div className="msn-popup-menu font-picker">
                    <div className="font-options">
                      <span style={{fontFamily: 'Arial'}} onClick={() => setUserStyle(prev => ({...prev, fontFamily: 'Arial'}))}>Arial</span>
                      <span style={{fontFamily: '"Comic Sans MS"'}} onClick={() => setUserStyle(prev => ({...prev, fontFamily: '"Comic Sans MS"'}))}>Comic Sans</span>
                      <span style={{fontFamily: '"Courier New"'}} onClick={() => setUserStyle(prev => ({...prev, fontFamily: '"Courier New"'}))}>Courier</span>
                    </div>
                    <div className="color-options">
                      <div className="color-box" style={{backgroundColor: '#000000'}} onClick={() => setUserStyle(prev => ({...prev, color: '#000000'}))}></div>
                      <div className="color-box" style={{backgroundColor: '#0000FF'}} onClick={() => setUserStyle(prev => ({...prev, color: '#0000FF'}))}></div>
                      <div className="color-box" style={{backgroundColor: '#FF0000'}} onClick={() => setUserStyle(prev => ({...prev, color: '#FF0000'}))}></div>
                      <div className="color-box" style={{backgroundColor: '#FF00FF'}} onClick={() => setUserStyle(prev => ({...prev, color: '#FF00FF'}))}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* LA CAJA DE TEXTO SE OCULTA CUANDO EL CHAT TERMINA (chatStep 3) */}
              <div className="msn-input-area">
                {chatStep !== 3 && (
                  <>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown} 
                      placeholder="Escribe un mensaje aquí..."
                      style={userStyle} 
                    ></textarea>
                    <div className="msn-send-container">
                      <button className="msn-send-btn" onClick={handleSend}>Enviar</button>
                    </div>
                  </>
                )}
              </div>

            </div>

            <div className="msn-sidebar">
              <div className="msn-avatar-box">
                <img src="/mi-foto.png" alt="Marcos" className="msn-avatar-img" />
              </div>
              <div className="msn-avatar-box">
                <img src="/msn-default.jpg" alt="Visitante" className="msn-avatar-img visitor" />
              </div>
            </div>
          </div>
          
          <div className="msn-status-bar">
            <span>Último mensaje recibido el {lastMessageTime}.</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default MsnMessenger;