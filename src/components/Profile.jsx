import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import {
    User, Mail, GraduationCap, Code, Briefcase, Save, Phone, MapPin,
    Github, Linkedin, Facebook, Camera, Plus, Star, CheckCircle, ExternalLink, Shield
} from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('about'); // about, portfolio, reviews

    // Initial State
    const [formData, setFormData] = useState({
        name: '', bio: '', phone: '', email: '', college: '',
        collegeEmail: '', address: '', skills: [], services: [],
        linkedin: '', github: '', portfolio: []
    });

    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                phone: user.phoneNumber || user.phone || '',
                email: user.email || '',
                college: user.college || '',
                collegeEmail: user.collegeEmail || '',
                address: user.address || '',
                skills: user.skills || [],
                services: user.services || [],
                linkedin: user.linkedin || '',
                github: user.github || '',
                portfolio: user.portfolio || []
            });
        }
    }, [user]);

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    if (loading) return null;

    return (
        <div className="profile-container section-padding container">

            {/* Header / Cover Section */}
            <div className="profile-header-card">
                <div className="profile-cover"></div>
                <div className="profile-main-info">
                    <div className="profile-avatar-wrapper">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="profile-avatar-xl"
                        />
                        {isEditing && <button className="camera-btn"><Camera size={18} /></button>}
                    </div>

                    <div className="profile-identity-block">
                        <div className="identity-row">
                            <h1>{formData.name || 'User Name'}</h1>
                            {user?.role === 'student' && <CheckCircle size={24} className="verified-badge" />}
                        </div>

                        <p className="profile-tagline">{formData.bio || "Student at MIT ADT University | Web Developer"}</p>

                        <div className="trust-badges-row">
                            <span className="trust-badge">
                                <Shield size={14} /> Phone Verified
                            </span>
                            {user?.collegeEmail && (
                                <span className="trust-badge">
                                    <GraduationCap size={14} /> College Verified
                                </span>
                            )}
                            <span className="trust-badge star">
                                <Star size={14} fill="#f59e0b" /> 4.8 Rating
                            </span>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="btn-secondary" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="profile-tabs">
                    <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
                    <button className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>Portfolio</button>
                    <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
                </div>
            </div>

            <div className="profile-grid">

                {/* Main Content Column */}
                <div className="profile-left-col">

                    {/* About Section */}
                    {activeTab === 'about' && (
                        <div className="profile-card">
                            <h3>About</h3>
                            <p className="bio-text">
                                {formData.bio || "I am a passionate student looking for opportunities to apply my skills in real-world projects. Experienced in React and Node.js."}
                            </p>

                            <div className="info-grid">
                                <div className="info-item">
                                    <Mail size={18} className="text-muted" />
                                    <span>{formData.email}</span>
                                </div>
                                <div className="info-item">
                                    <Phone size={18} className="text-muted" />
                                    <span>{formData.phone || "+91 98765 43210"}</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={18} className="text-muted" />
                                    <span>{formData.address || "Pune, India"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Portfolio Grid */}
                    {activeTab === 'portfolio' && (
                        <div className="portfolio-grid">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="portfolio-card">
                                    <div className="portfolio-img"></div>
                                    <div className="portfolio-content">
                                        <h4>E-commerce App Redesign</h4>
                                        <p>UI/UX Design • React</p>
                                        <a href="#" className="link-sm">View Project <ExternalLink size={12} /></a>
                                    </div>
                                </div>
                            ))}
                            <div className="portfolio-card add-new">
                                <Plus size={32} />
                                <p>Add Project</p>
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {activeTab === 'reviews' && (
                        <div className="reviews-list">
                            <div className="review-card">
                                <div className="review-header">
                                    <span className="reviewer-name">Amit Kumar</span>
                                    <div className="stars"><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /></div>
                                </div>
                                <p className="review-text">"Excellent work! Delivered the PPT way before time."</p>
                            </div>
                            <div className="review-card">
                                <div className="review-header">
                                    <span className="reviewer-name">DesignStudio</span>
                                    <div className="stars"><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /></div>
                                </div>
                                <p className="review-text">"Great communication, but needed a few revisions."</p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Sidebar Column */}
                <div className="profile-right-col">

                    {/* Skills Widget */}
                    <div className="profile-card">
                        <h3>Skills & Tools</h3>
                        <div className="skills-cloud">
                            {(formData.skills.length > 0 ? formData.skills : ["React", "Figma", "Node.js", "Python"]).map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="add-skill-row">
                                <input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add skill"
                                    className="input-xs"
                                />
                                <button onClick={handleAddSkill} className="btn-xs-primary">+</button>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="profile-card">
                        <h3>Linked Accounts</h3>
                        <div className="social-links-col">
                            <a href="#" className="social-btn linkedin"><Linkedin size={18} /> LinkedIn</a>
                            <a href="#" className="social-btn github"><Github size={18} /> GitHub</a>
                            <div className="social-btn google connected"><div className="g-icon">G</div> Connected</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;
