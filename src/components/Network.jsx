import React from 'react';
import { UserPlus } from 'lucide-react';

const Network = () => {
    return (
        <div className="section-padding container">
            <h1>My Network 👥</h1>
            <div style={{ background: '#fffbeb', color: '#b45309', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', display: 'inline-block', marginTop: '8px', border: '1px solid #fcd34d', marginBottom: '1rem' }}>
                ⚠️ Sample data for demo purposes
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3>Friend Suggestions</h3>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginTop: '1rem' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                            minWidth: '200px',
                            background: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            border: '1px solid var(--surface-border)'
                        }}>
                            <div style={{ width: '60px', height: '60px', background: '#333', borderRadius: '50%', margin: '0 auto 1rem' }}></div>
                            <h4>Student name {i}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Full Stack Dev</p>
                            <button className="btn-primary btn-sm"><UserPlus size={16} /> Connect</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Network;
