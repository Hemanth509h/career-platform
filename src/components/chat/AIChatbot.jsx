import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AIChatbot = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm your AI Career Advisor powered by local Ollama AI. Ask me anything about your career matches, upskilling opportunities, or about any of the 250+ careers in our database!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessageText = (text) => {
    if (!text) return null;

    // Normalize line breaks and numbering formatting
    const normalized = text
      .replace(/\r\n/g, '\n')
      .replace(/\n\s*/g, '\n')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n+/g, '<br/>')
      .replace(/\d+\.\s*/g, (match) => `${match}`);

    // Convert image markdown with fallback inline rendering
    const parts = normalized.split(/(!\[[^\]]*\]\([^\)]+\))/g);

    return parts.map((part, i) => {
      const imgMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        return (
          <div key={i} style={{ marginTop: '10px', background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <img
              src={imgMatch[2]}
              alt={imgMatch[1] || 'AI Generated Image'}
              style={{ maxWidth: '100%', borderRadius: '8px', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        );
      }

      // Convert <strong> markers to React elements safely
      const strongParts = part.split(/<strong>(.*?)<\/strong>/g);
      if (strongParts.length > 1) {
        return (
          <span key={i}>
            {strongParts.map((chunk, index) => {
              if (index % 2 === 1) {
                return <strong key={index}>{chunk}</strong>;
              }
              return chunk.split('<br/>').map((line, ln) => (
                <React.Fragment key={`${index}-${ln}`}>
                  {line}
                  {ln < line.split('<br/>').length - 1 && <br />}
                </React.Fragment>
              ));
            })}
          </span>
        );
      }

      return part.split('<br/>').map((line, lineIndex) => (
        <React.Fragment key={`${i}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('<br/>').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    const currentInput = input;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: currentInput,
          userProfile: user || { name: 'Student' }
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.response || "I couldn't process that. Please try again.",
        sender: 'bot'
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm temporarily offline. Please ensure the backend server is running on port 3001.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isOpen ? 'rgba(24, 25, 30, 0.96)' : 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-color-alt) 100%)',
          color: 'white',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.3)',
          zIndex: 1100,
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.18)',
          transition: 'transform 0.2s ease, background 0.3s ease',
          backdropFilter: 'blur(12px)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '560px',
            maxHeight: 'calc(100vh - 90px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1050,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '20px',
            backdropFilter: 'blur(18px)',
            background: 'rgba(14, 16, 25, 0.8)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '44px', height: '44px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                <Bot size={24} color="white" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Career Advisor AI</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontWeight: 600 }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--success-color)', borderRadius: '4px', display: 'inline-block' }}></span>
                  Online • Ollama Local AI
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '32px', height: '32px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(10,10,18,0.45)', borderRadius: '0 0 0 0', border: '1px solid rgba(255,255,255,0.08)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '10px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '86%' }}>
                {msg.sender === 'bot' && (
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}> 
                    <Bot size={16} color="var(--accent-color)" />
                  </div>
                )}
                <div style={{
                  maxWidth: '100%',
                  borderRadius: '18px',
                  padding: '12px 14px',
                  lineHeight: '1.55',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                  background: msg.sender === 'user' ? 'linear-gradient(130deg, rgba(99, 102, 241, 0.95), rgba(168, 85, 247, 0.95))' : 'rgba(34, 36, 50, 0.82)',
                  border: msg.sender === 'user' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: msg.sender === 'user' ? '0 6px 16px rgba(99,102,241,0.22)' : '0 1px 10px rgba(0,0,0,0.25)',
                  wordBreak: 'break-word'
                }}>
                  {renderMessageText(msg.text)}
                </div>
                {msg.sender === 'user' && (
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(168,85,247,0.22)', border: '1px solid rgba(168,85,247,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User size={16} color="var(--accent-color-alt)" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', alignItems: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader size={16} color="var(--accent-color)" style={{ animation: 'spin 1.5s linear infinite' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '12px 20px', borderRadius: '4px 20px 20px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem', minWidth: '100px' }}>
                  Analyzing your query...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '18px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(5,8,18,0.55)', backdropFilter: 'blur(24px)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', position: 'relative' }}>
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
                style={{
                  flex: 1,
                  minHeight: '44px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '14px',
                  padding: '12px 48px 12px 16px',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  transition: 'all 0.25s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.07)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
              />
              <button
                id="chatbot-send"
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  background: isLoading || !input.trim() ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  border: 'none',
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isLoading || !input.trim() ? 'none' : '0 4px 12px rgba(99,102,241,0.3)'
                }}
              >
                <Send size={18} style={{ marginLeft: '2px' }} />
              </button>
            </form>
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
              Press Enter to send message
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
        </div>
      )}
    </>
  );
};

export default AIChatbot;
