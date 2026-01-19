import React, { useState } from 'react';
import { Plus, ExternalLink, Image as ImageIcon } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [projects, setProjects] = useState([
        { id: 1, title: 'E-commerce Redesign', category: 'UI/UX', image: null },
        { id: 2, title: 'Library Management System', category: 'Development', image: null }
    ]);

    const addProject = () => {
        const title = prompt("Project Title:");
        if (title) setProjects([...projects, { id: Date.now(), title, category: 'General', image: null }]);
    };

    return (
        <div className="section-padding container">
            <div className="page-header">
                <h1>My Portfolio</h1>
                <button className="btn-primary" onClick={addProject}>
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <div className="projects-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            {project.image ? <img src={project.image} alt={project.title} /> : <ImageIcon size={40} className="placeholder-icon" />}
                        </div>
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <span className="badge">{project.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
