import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { X, User, Lock, Mail, Briefcase, GraduationCap } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        college: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let data;
            if (isLogin) {
                data = await api.login({ email: formData.email, password: formData.password });
            } else {
                data = await api.register(formData);
            }

            login(data.token, data);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-overlay">
            <div className="auth-modal">
                <button className="auth-close" onClick={onClose}><X size={24} /></button>

                <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Join HustleHub'}</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <User size={18} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <Mail size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder={isLogin ? "Email Address" : "College Email (.edu)"}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Lock size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="role-toggle">
                                <button
                                    type="button"
                                    className={formData.role === 'student' ? 'active' : ''}
                                    onClick={() => setFormData({ ...formData, role: 'student' })}
                                >
                                    <GraduationCap size={16} /> Student
                                </button>
                                <button
                                    type="button"
                                    className={formData.role === 'client' ? 'active' : ''}
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                >
                                    <Briefcase size={16} /> Client
                                </button>
                            </div>

                            {formData.role === 'student' && (
                                <div className="form-group">
                                    <GraduationCap size={18} />
                                    <input
                                        type="text"
                                        name="college"
                                        placeholder="College Name"
                                        value={formData.college}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                    </button>
                </form>

                <p className="auth-switch">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
