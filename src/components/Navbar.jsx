import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenAuth }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            background: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
            borderBottom: isScrolled ? '1px solid var(--surface-border)' : '1px solid transparent',
            transition: 'all 0.3s ease'
        }}>
            <div className="container navbar-content">
                <Link to="/" className="logo text-gradient">HustleHub</Link>

                <div className="desktop-nav">
                    {!isAuthenticated && (
                        <>
                            <a href="#how-it-works">How it Works</a>
                            <a href="#features">Features</a>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            {user.role === 'student' ? (
                                <>
                                    <Link to="/find-work">Find Work</Link>
                                    <Link to="/tasks">My Tasks</Link>
                                    <Link to="/portfolio">Portfolio</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/find-talent">Find Talent</Link>
                                    <Link to="/tasks">My Tasks</Link>
                                </>
                            )}
                            <Link to="/learn">Learn</Link>
                            <Link to="/network">Network</Link>
                            <Link to="/payments">Payments</Link>
                        </>
                    )}
                </div>

                <div className="nav-actions">
                    {isAuthenticated ? (
                        <>
                            <div className="profile-dropdown-container" style={{ position: 'relative' }}>
                                <button
                                    className="profile-trigger"
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <div className="avatar-xs" style={{
                                        width: '32px', height: '32px', background: '#8b5cf6',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: 'white', fontSize: '14px'
                                    }}>
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <span style={{ color: 'var(--text-primary)' }}>{user.name?.split(' ')[0]}</span>
                                </button>

                                {profileDropdownOpen && (
                                    <div className="dropdown-menu" style={{
                                        position: 'absolute', top: '120%', right: '0',
                                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                        borderRadius: '8px', padding: '8px', width: '150px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100
                                    }}>
                                        <Link to="/profile" className="dropdown-item" style={{ display: 'block', padding: '8px', color: 'var(--text-primary)', textDecoration: 'none' }} onClick={() => setProfileDropdownOpen(false)}>
                                            Profile
                                        </Link>
                                        <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>
                                        <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
