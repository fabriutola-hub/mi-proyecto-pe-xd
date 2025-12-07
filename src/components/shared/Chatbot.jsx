import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CapacitorHttp } from '@capacitor/core';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'HOLA. SOY TU GUÍA EN LA MUELA DEL DIABLO. ¿QUÉ NECESITAS?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_URL = 'https://miss-minutes-backend.onrender.com/api/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await CapacitorHttp.post({
        url: API_URL,
        headers: { 'Content-Type': 'application/json' },
        data: { 
            message: currentInput, 
            sessionId, 
            useVision: false 
        }
      });

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        images: response.data.images || [],
        analyzedImages: response.data.analyzedImages || [],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'ERROR DE SISTEMA. INTENTE NUEVAMENTE.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = async () => {
    try {
      await CapacitorHttp.post({
        url: 'https://miss-minutes-backend.onrender.com/api/reset',
        headers: { 'Content-Type': 'application/json' },
        data: { sessionId }
      });
      setMessages([{
        type: 'bot',
        text: 'MEMORIA REINICIADA. ¿CÓMO PUEDO AYUDARTE?',
        timestamp: new Date()
      }]);
    } catch (error) { console.error(error); }
  };

  const quickSuggestions = [
    'UBICACIÓN',
    'HISTORIA',
    'FOTOS',
    'COMO LLEGAR'
  ];

  return (
    <>
      {/* --- BOTÓN FLOTANTE --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-neo-green text-neo-black border-4 border-neo-black neo-shadow-orange flex items-center justify-center group transition-transform"
      >
        {isOpen ? (
          <span className="text-3xl font-black">X</span>
        ) : (
          <span className="text-3xl font-black">?</span>
        )}
      </motion.button>

      {/* --- VENTANA DEL CHAT --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-0 bottom-0 md:inset-x-auto md:right-8 md:bottom-28 z-[100] w-full md:w-[400px] h-[80vh] md:h-[600px] flex flex-col"
          >
            {/* Contenedor Neobrutalista */}
            <div className="w-full h-full bg-neo-white border-4 border-neo-black neo-shadow-purple flex flex-col">
              
              {/* Header */}
              <div className="bg-neo-black text-neo-white p-4 border-b-4 border-neo-black flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-neo-green animate-pulse" />
                  <h3 className="font-heading font-bold uppercase tracking-widest text-lg">ASISTENTE_V1</h3>
                </div>

                <button 
                  onClick={handleReset}
                  className="px-2 py-1 text-xs border border-neo-white hover:bg-neo-white hover:text-neo-black uppercase font-bold transition-colors"
                >
                  Reiniciar
                </button>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neo-lightgray">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-4 border-2 border-neo-black neo-shadow-sm font-body font-bold text-sm ${
                        msg.type === 'user' 
                          ? 'bg-neo-orange text-neo-black'
                          : 'bg-neo-white text-neo-black'
                      }`}
                    >
                      <p className="whitespace-pre-wrap uppercase">{msg.text}</p>

                      {msg.images?.length > 0 && (
                        <div className="mt-2 grid gap-2">
                          {msg.images.map((img, i) => (
                            <img key={i} src={img.url} alt="img" className="w-full border-2 border-neo-black" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 p-2 text-neo-black font-bold uppercase text-xs">
                    <span>Escribiendo...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sugerencias */}
              {messages.length <= 1 && (
                <div className="bg-neo-white p-2 border-t-4 border-neo-black flex gap-2 overflow-x-auto">
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInputValue(suggestion); inputRef.current?.focus(); }}
                      className="whitespace-nowrap px-3 py-1 bg-neo-green border-2 border-neo-black text-neo-black text-xs font-bold uppercase hover:bg-neo-black hover:text-neo-green transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSendMessage} className="bg-neo-white p-4 border-t-4 border-neo-black flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="ESCRIBE AQUÍ..."
                  disabled={isTyping}
                  className="flex-1 bg-neo-lightgray border-2 border-neo-black p-2 font-mono text-neo-black placeholder-neo-black/50 focus:outline-none focus:bg-white uppercase font-bold"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-neo-purple text-neo-white border-2 border-neo-black font-bold uppercase hover:bg-neo-black hover:text-neo-purple transition-colors disabled:opacity-50"
                >
                  {'>'}
                </button>
              </form>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
