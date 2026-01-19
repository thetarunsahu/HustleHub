import React, { useState } from 'react';
import { BookOpen, PlayCircle, Award } from 'lucide-react';

const Learning = () => {
    // Local state for interactive demo
    const [courses, setCourses] = useState([
        { id: 1, title: 'Freelancing 101', progress: 100, type: 'Article', totalForBadge: 100 },
        { id: 2, title: 'React for Beginners', progress: 45, type: 'Video Course', totalForBadge: 100 },
        { id: 3, title: 'Client Communication Masterclass', progress: 0, type: 'Workshop', totalForBadge: 100 }
    ]);

    const handleContinue = (id) => {
        setCourses(courses.map(c => {
            if (c.id === id) {
                const newProgress = Math.min(c.progress + 20, 100);
                if (newProgress === 100 && c.progress < 100) {
                    alert(`🎉 Congratulations! You've completed ${c.title}!`);
                }
                return { ...c, progress: newProgress };
            }
            return c;
        }));
    };

    return (
        <div className="section-padding container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Learning Center 📚</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Upskill yourself to earn badges and more money.</p>
                    <div style={{ background: '#fffbeb', color: '#b45309', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', display: 'inline-block', marginTop: '8px', border: '1px solid #fcd34d' }}>
                        ⚠️ Sample data for demo purposes
                    </div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Skill Badges</span>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        <Award size={20} color="#10b981" />
                        <Award size={20} color="#3b82f6" />
                        <Award size={20} color="#6366f1" style={{ opacity: 0.3 }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {courses.map(course => (
                    <div key={course.id} style={{
                        background: 'var(--bg-secondary)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--surface-border)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{
                                background: 'rgba(139, 92, 246, 0.1)',
                                color: '#8b5cf6',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem'
                            }}>{course.type}</span>
                            {course.progress === 100 && <Award size={20} color="#10b981" />}
                        </div>

                        <h3 style={{ marginBottom: '1rem' }}>{course.title}</h3>

                        <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${course.progress}%`,
                                height: '100%',
                                background: course.progress === 100 ? '#10b981' : '#8b5cf6',
                                transition: 'width 0.5s'
                            }}></div>
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {course.progress === 100 ? 'Completed' : `${course.progress}% Complete`}
                        </p>

                        <button
                            className="btn-secondary full-width"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => handleContinue(course.id)}
                            disabled={course.progress === 100}
                        >
                            {course.progress === 100 ? 'Review Course' : (course.progress === 0 ? 'Start Learning' : 'Continue')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Learning;
