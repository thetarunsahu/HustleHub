import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero section-padding">
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="hero-badge">
                        <Sparkles size={16} className="text-accent" />
                        <span>Exclusive for College Students</span>
                    </div>

                    <h1 className="hero-title">
                        Small Skills. <br />
                        <span className="text-gradient">Real Earnings.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Turn your spare time into cash. The first college-exclusive platform
                        bridging the gap between students and simple gigs.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-primary flex-center">
                            Join as Student <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                        <button className="btn-secondary">
                            Post a Task
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">₹10k+</span>
                            <span className="stat-label">Paid Out</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="glass-card mockup">
                        <div className="mockup-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <div className="mockup-content">
                            <div className="task-row">
                                <div className="avatar"></div>
                                <div className="task-info">
                                    <div className="skeleton-text w-3/4"></div>
                                    <div className="skeleton-text w-1/2"></div>
                                </div>
                                <div className="task-price">₹500</div>
                            </div>
                            <div className="task-row">
                                <div className="avatar"></div>
                                <div className="task-info">
                                    <div className="skeleton-text w-3/4"></div>
                                    <div className="skeleton-text w-1/2"></div>
                                </div>
                                <div className="task-price">₹1200</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
