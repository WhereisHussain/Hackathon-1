import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        const handleMouseUp = () => {
            const text = window.getSelection().toString();
            if (text.length > 5) {
                setSelectedText(text);
            }
        };
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages([...messages, userMsg]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:8000/chat/query', {
                question: input,
                selected_text: selectedText
            });
            setMessages(prev => [...prev, { role: 'bot', content: response.data.answer }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: 'Error connecting to AI backend.' }]);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    style={{ borderRadius: '50%', width: '60px', height: '60px', backgroundColor: '#2e8555', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div style={{ width: '350px', height: '500px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
                    <div style={{ padding: '15px', backgroundColor: '#2e8555', color: 'white', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Robotics AI Tutor</span>
                        <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
                    </div>
                    
                    <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {selectedText && (
                            <div style={{ fontSize: '0.8rem', padding: '10px', backgroundColor: '#f0f4f8', borderRadius: '8px', borderLeft: '4px solid #2e8555' }}>
                                <strong>Context:</strong> "{selectedText.substring(0, 100)}..."
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '10px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#e1f5fe' : '#f5f5f5', fontSize: '0.9rem' }}>
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <button onClick={handleSend} style={{ backgroundColor: '#2e8555', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
