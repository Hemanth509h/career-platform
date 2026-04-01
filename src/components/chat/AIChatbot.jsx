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
          transition: 'background 0.3s ease',
          backdropFilter: 'blur(16px)'
        }}
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
            bottom: '110px',
            right: '30px',
            width: '420px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px'
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
                  Online • Gemini 1.5 Flash
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '32px', height: '32px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(0,0,0,0.2)' }}>
            {messages.map((msg, idx) => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                {msg.sender === 'bot' && (
                  <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Bot size={16} color="var(--accent-color)" />
                  </div>
                )}
                <div style={{
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-color), var(--accent-color-alt))' : 'rgba(255, 255, 255, 0.05)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--glass-border)',
                  padding: '14px 18px',
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                  color: 'white',
                  fontSize: '0.92rem',
                  lineHeight: '1.6',
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(99,102,241,0.2)' : 'none'
                }}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
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
          <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '14px 50px 14px 20px',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  transition: 'background 0.3s ease'
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
