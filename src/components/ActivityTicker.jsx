import React from 'react';
import { TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivityTicker = () => {
    // Dummy Data for the ticker
    const activities = [
        { id: 1, text: "Rahul just earned ₹500", icon: <DollarSign size={14} color="#10b981" /> },
        { id: 2, text: "New Task: Logo Design (₹1500)", icon: <TrendingUp size={14} color="#3b82f6" /> },
        { id: 3, text: "Sneha verified her profile", icon: <CheckCircle size={14} color="#8b5cf6" /> },
        { id: 4, text: "Amit completed 'Python Script'", icon: <CheckCircle size={14} color="#10b981" /> },
        { id: 5, text: "New Task: Content Writing", icon: <TrendingUp size={14} color="#3b82f6" /> },
        { id: 6, text: "Priya earned ₹300", icon: <DollarSign size={14} color="#10b981" /> },
    ];

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid var(--surface-border)',
            overflow: 'hidden',
            padding: '8px 0',
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '50px',
                background: 'linear-gradient(90deg, var(--bg-primary), transparent)',
                zIndex: 2
            }}></div>
            <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '50px',
                background: 'linear-gradient(90deg, transparent, var(--bg-primary))',
                zIndex: 2
            }}></div>

            <motion.div
                className="ticker-track"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear"
                }}
                style={{
                    display: 'flex',
                    gap: '40px',
                    whiteSpace: 'nowrap',
                    paddingLeft: '20px'
                }}
            >
                {/* Duplicate list 3 times for seamless loop */}
                {[...activities, ...activities, ...activities].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '2px 10px',
                        borderRadius: '12px'
                    }}>
                        {item.icon}
                        <span>{item.text}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ActivityTicker;
