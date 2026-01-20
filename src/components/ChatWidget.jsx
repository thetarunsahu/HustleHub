import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 Welcome to HustleHub. I'm here to help you get started.", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0);
    // Steps: 0: Greeting -> 1: Name -> 2: Role -> 3: Goal -> 4: End

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // Simple Linear Flow Logic
    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        // User Message
        const newMessages = [...messages, { id: Date.now(), text, sender: 'user' }];
        setMessages(newMessages);
        setInputValue('');

        // Bot Response Delays
        setTimeout(() => {
            let botResponse = "";
            const nextStep = step + 1;

            switch (nextStep) {
                case 1:
                    botResponse = "Great! First, what should I call you?";
                    break;
                case 2:
                    botResponse = `Nice to meet you, ${text}! Are you a Student looking for work, or a Client looking for talent?`;
                    break;
                case 3:
                    botResponse = "Got it. What's your main goal right now? (e.g., Earn money, Build portfolio, Hire quickly)";
                    break;
                case 4:
                    botResponse = "Perfect! I've noted your details. An actual human from our team will reach out to guide you personally. 🚀";
                    break;
                default:
                    botResponse = "Is there anything else I can help you with?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setStep(nextStep);

        }, 800);
    };

    const handleQuickReply = (option) => {
        handleSend(option);
    };

    return (
        <div className="chat-widget-wrapper">
            {/* Toggle Button */}
            <motion.button
                className="chat-toggle-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronDown size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    >
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="bot-avatar-sm"><Bot size={16} /></div>
                                <div>
                                    <h4>HustleBot 🤖</h4>
                                    <p>Online • Replies instantly</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="close-btn"><X size={18} /></button>
                        </div>

                        <div className="chat-body">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message-row ${msg.sender}`}>
                                    {msg.sender === 'bot' && <div className="msg-avatar"><Bot size={14} /></div>}
                                    <div className="message-bubble">{msg.text}</div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (Role Selection) */}
                        {step === 1 && messages[messages.length - 1].sender === 'bot' && (
                            <div className="quick-actions">
                                <button onClick={() => handleQuickReply("Student")} className="quick-btn">Student 🎓</button>
                                <button onClick={() => handleQuickReply("Client")} className="quick-btn">Client 💼</button>
                            </div>
                        )}

                        <div className="chat-input-area">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={step === 1 && messages[messages.length - 1].sender === 'bot'} // Disable text input during role selection (optional UX choice)
                            />
                            <button onClick={() => handleSend()}><Send size={18} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatWidget;
