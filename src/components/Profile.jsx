import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { User, Mail, GraduationCap, Code, Briefcase, Save, Phone, MapPin, Github, Linkedin, Facebook, Camera, Plus, Star, CheckCircle } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Initial State structure matching user requirements
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phone: '',
        email: '',
        college: '',
        collegeEmail: '',
        address: '',
        skills: [],
        services: [],
        linkedin: '',
        github: '',
        facebook: ''
    });

    const [newSkill, setNewSkill] = useState('');
    const [newService, setNewService] = useState('');

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
                facebook: user.facebook || ''
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

    const handleRemoveSkill = (skillToRemove) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
    };

    const handleAddService = (e) => {
        e.preventDefault();
        if (newService.trim() && !formData.services.includes(newService.trim())) {
            setFormData({ ...formData, services: [...formData.services, newService.trim()] });
            setNewService('');
        }
    };

    const handleRemoveService = (serviceToRemove) => {
        setFormData({ ...formData, services: formData.services.filter(s => s !== serviceToRemove) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updatedData = {
                name: formData.name,
                bio: formData.bio,
                college: formData.college,
                skills: formData.skills,
                services: formData.services,
                // Pass other fields if API handles them, for MVP mostly skills/services persistence
            };

            await api.updateProfile(updatedData);
            setIsEditing(false);
            alert("Profile Updated Successfully!");
            window.location.reload();
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <section className="profile-section section-padding">
            <div className="container">

                <div className="profile-header-card">
                    <div className="profile-cover"></div>
                    <div className="profile-main">
                        <div className="avatar-wrapper">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="profile-avatar-lg"
                            />
                            {isEditing && <button className="camera-btn"><Camera size={18} /></button>}
                        </div>
                        <div className="profile-identity">
                            <h1>
                                {formData.name || 'User'}
                                {user?.role === 'student' && <CheckCircle size={20} fill="#3b82f6" color="white" style={{ marginLeft: '5px', verticalAlign: 'text-bottom' }} />}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                <span className="sc-role">{user?.role === 'client' ? 'Client' : 'Student'}</span>
                                {user?.phoneNumber && (
                                    <span style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                                        <CheckCircle size={12} /> Phone Verified
                                    </span>
                                )}
                                {user?.role === 'student' && (
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        <div style={{ display: 'flex' }}><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} fill="#f59e0b" /><Star size={14} color="#f59e0b" /></div>
                                        <span style={{ marginLeft: '5px', color: 'var(--text-secondary)' }}>4.0 (12 Reviews)</span>
                                    </div>
                                )}
                            </div>

                            <p className="sc-bio" style={{ fontStyle: formData.bio ? 'normal' : 'italic', color: formData.bio ? 'inherit' : 'var(--text-muted)' }}>
                                {formData.bio || 'Add a short bio to build trust with clients.'}
                            </p>
                        </div>
                        <button
                            className={`btn-secondary edit-toggle ${isEditing ? 'active' : ''}`}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-grid-form">

                        <div className="form-section">
                            <h3>Personal Information</h3>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Bio</label>
                                <textarea rows="3" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Address</label>
                                <div className="icon-input">
                                    <MapPin size={18} />
                                    <input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Contact & Education</h3>
                            <div className="input-group">
                                <label>Phone</label>
                                <div className="icon-input">
                                    <Phone size={18} />
                                    <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <div className="icon-input">
                                    <Mail size={18} />
                                    <input value={formData.email} disabled className="disabled-input" />
                                </div>
                            </div>
                            {user?.role === 'student' && (
                                <>
                                    <div className="input-group">
                                        <label>College Name</label>
                                        <div className="icon-input">
                                            <GraduationCap size={18} />
                                            <input value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>College Email</label>
                                        <div className="icon-input">
                                            <Mail size={18} />
                                            <input value={formData.collegeEmail} onChange={e => setFormData({ ...formData, collegeEmail: e.target.value })} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="form-section">
                            <h3>Skills & Expertise</h3>
                            <div className="input-group">
                                <label>Skills</label>
                                <div className="skills-input-wrapper" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        value={newSkill}
                                        onChange={e => setNewSkill(e.target.value)}
                                        placeholder="Add a skill..."
                                        className="skill-input"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                                    />
                                    <button onClick={handleAddSkill} className="btn-secondary btn-sm" type="button"><Plus size={16} /></button>
                                </div>
                                <div className="tags-editable">
                                    {formData.skills.map(skill => (
                                        <span key={skill} className="tag-edit">
                                            {skill}
                                            <button type="button" onClick={() => handleRemoveSkill(skill)}>&times;</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {user?.role === 'client' && (
                                <div className="input-group">
                                    <label>Services needed often</label>
                                    <div className="skills-input-wrapper" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                        <input
                                            value={newService}
                                            onChange={e => setNewService(e.target.value)}
                                            placeholder="Add service..."
                                            className="skill-input" // Use same class
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddService(e)}
                                        />
                                        <button onClick={handleAddService} className="btn-secondary btn-sm" type="button"><Plus size={16} /></button>
                                    </div>
                                    <div className="tags-editable">
                                        {formData.services.map(s => (
                                            <span key={s} className="tag-edit">
                                                {s}
                                                <button type="button" onClick={() => handleRemoveService(s)}>&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="input-group">
                                <label>LinkedIn Profile</label>
                                <div className="icon-input">
                                    <Linkedin size={18} />
                                    <input value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary save-btn" disabled={saving}>
                                <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>

                    </form>
                ) : (
                    <div className="profile-details-view">
                        <div className="view-card">
                            <h3>About</h3>
                            <div className="info-row">
                                <Mail size={16} /> <span>{formData.email}</span>
                            </div>
                            <div className="info-row">
                                <Phone size={16} /> <span>{formData.phone || 'No phone'}</span>
                            </div>
                            {formData.address && (
                                <div className="info-row">
                                    <MapPin size={16} /> <span>{formData.address}</span>
                                </div>
                            )}
                        </div>

                        <div className="view-card">
                            <h3>{user?.role === 'student' ? 'My Skills' : 'Services Needed'}</h3>
                            <div className="tags">
                                {(user?.role === 'student' ? formData.skills : formData.services).map((skill, i) => (
                                    <span key={i} className="tag">{skill}</span>
                                ))}
                                {(user?.role === 'student' ? formData.skills : formData.services).length === 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                                        <div className="tags blur-tags" style={{ opacity: 0.5 }}>
                                            <span className="tag">Communication</span>
                                            <span className="tag">Design</span>
                                            <span className="tag">Python</span>
                                        </div>
                                        <button onClick={() => setIsEditing(true)} className="btn-sm btn-outline">
                                            + Add Skills
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="view-card">
                            <h3>Linked Accounts</h3>
                            <div className="social-links">
                                {formData.linkedin && <a href={formData.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin"><Linkedin size={20} /> LinkedIn</a>}
                                {formData.github && <a href={formData.github} target="_blank" rel="noreferrer" className="social-link github"><Github size={20} /> GitHub</a>}
                                <button className="social-link google"><span className="g-icon">G</span> Connected</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
