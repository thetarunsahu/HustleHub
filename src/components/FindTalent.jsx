import React from 'react';
import './FindTalent.css';

const FindTalent = () => {
    const students = [
        { id: 1, name: "Tarun K", role: "Full Stack Dev", skills: ["React", "Node.js"], rate: "₹500/hr" },
        { id: 2, name: "Sarah M", role: "Graphic Designer", skills: ["Photoshop", "Figma"], rate: "₹300/hr" },
        { id: 3, name: "Raj P", role: "Content Writer", skills: ["SEO", "Blogging"], rate: "₹1/word" }
    ];

    return (
        <div className="section-padding container">
            <h1>Find Talent</h1>
            <p className="subtitle">Hire top students for your next project.</p>
            <div style={{ marginBottom: '20px', background: '#fffbeb', color: '#b45309', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', display: 'inline-block', border: '1px solid #fcd34d' }}>
                ⚠️ Sample data for demo purposes
            </div>

            <div className="talent-grid">
                {students.map(student => (
                    <div key={student.id} className="talent-card">
                        <div className="talent-header">
                            <div className="avatar"></div>
                            <div>
                                <h3>{student.name}</h3>
                                <p className="text-secondary">{student.role}</p>
                            </div>
                        </div>
                        <div className="talent-skills">
                            {student.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                        </div>
                        <div className="talent-footer">
                            <span className="rate">{student.rate}</span>
                            <button className="btn-sm btn-primary">Hire</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindTalent;
