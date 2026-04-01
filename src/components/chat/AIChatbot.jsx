import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AIChatbot = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm your AI Career Advisor powered by Google Gemini. Ask me anything about your career matches, upskilling opportunities, or about any of the 250+ careers in our database!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    const currentInput = input;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
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
        text: "I'm temporarily offline. Please ensure the backend server is running on port 5000.",
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
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isOpen ? 'var(--panel-bg)' : 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-color-alt) 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          zIndex: 1000,
          cursor: 'pointer',
          border: '1px solid var(--glass-border)',
          transition: 'transform 0.3s ease, background 0.3s ease',
          backdropFilter: 'blur(16px)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="glass-panel animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '110px',
            right: '30px',
            width: '400px',
            height: '540px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))', width: '40px', height: '40px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={22} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Career Advisor AI</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--success-color)', borderRadius: '3px', display: 'inline-block' }}></span>
                Powered by Google Gemini
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '10px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
                {msg.sender === 'bot' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                    <Bot size={14} color="var(--accent-color)" />
                  </div>
                )}
                <div style={{
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))' : 'rgba(255, 255, 255, 0.05)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--glass-border)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  color: 'white',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                    <User size={14} color="var(--accent-color-alt)" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader size={14} color="var(--accent-color)" style={{ animation: 'spin 1s linear infinite' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px 16px', borderRadius: '4px 18px 18px 18px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.15)' }}>
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any career, skill, or path..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '10px 18px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
            <button
              id="chatbot-send"
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: isLoading || !input.trim() ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))',
                width: '42px',
                height: '42px',
                borderRadius: '21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: 'none',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s'
              }}
            >
              <Send size={17} style={{ marginLeft: '1px' }} />
            </button>
          </form>
          <style dangerouslySetInnerHTML={{__html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
        </div>
      )}
    </>
  );
};

export default AIChatbot;
