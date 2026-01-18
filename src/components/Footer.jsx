import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3 className="text-gradient">HustleHub</h3>
                    <p>Small Skills. Real Earnings.</p>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>Platform</h4>
                        <a href="#">How it Works</a>
                        <a href="#">Safety</a>
                        <a href="#">Support</a>
                    </div>
                    <div className="link-group">
                        <h4>Legal</h4>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} HustleHub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
