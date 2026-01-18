import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onOpenAuth }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo">
                    <span className="text-gradient">HustleHub</span>
                </div>

                <div className="desktop-nav">
                    <a href="#how-it-works">How it Works</a>
                    <a href="#features">Features</a>
                    <a href="#impact">Impact</a>
                </div>

                <div className="nav-actions">
                    {isAuthenticated ? (
                        <>
                            <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                            <button className="btn-secondary" onClick={logout}>Logout</button>
                            {user.role === 'client' && <button className="btn-primary" onClick={() => window.location.href = '#tasks'}>Post Task</button>}
                        </>
                    ) : (
                        <>
                            <button className="btn-secondary" onClick={onOpenAuth}>Post a Task</button>
                            <button className="btn-primary" onClick={onOpenAuth}>Join Now</button>
                        </>
                    )}
                </div>

                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
