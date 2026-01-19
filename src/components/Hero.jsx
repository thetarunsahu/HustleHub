import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ActivityTicker from './ActivityTicker';
import './Hero.css';

const Hero = ({ onOpenAuth }) => {
    return (
        <section className="hero section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '0', width: '100%', zIndex: 10 }}>
                <ActivityTicker />
            </div>
            <div className="container hero-container" style={{ marginTop: '40px' }}>
                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="hero-badge">
                        <Sparkles size={16} className="text-accent" />
                        <span>Exclusive for College Students</span>
                    </motion.div>

                    <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="hero-title">
                        Small Skills. <br />
                        <span className="text-gradient">Real Earnings.</span>
                    </motion.h1>

                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="hero-subtitle">
                        Turn your spare time into cash. The first college-exclusive platform
                        bridging the gap between students and simple gigs.
                    </motion.p>

                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="hero-actions">
                        <button className="btn-primary flex-center magnetic-hover" onClick={onOpenAuth}>
                            Join as Student <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                        <button className="btn-secondary magnetic-hover" onClick={onOpenAuth}>
                            Post a Task
                        </button>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">₹10k+</span>
                            <span className="stat-label">Paid Out</span>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="hero-visual" style={{ position: 'relative' }}>
                    <motion.div
                        className="gradient-orb orb-1"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="gradient-orb orb-2"
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, 30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Cards Container */}
                    <div style={{ position: 'relative', width: '100%', height: '400px', perspective: '1000px' }}>

                        {/* Main Card */}
                        <motion.div
                            className="glass-card mockup interactive"
                            initial={{ opacity: 0, rotateY: 15, rotateX: 5 }}
                            animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
                            style={{ position: 'absolute', top: '20%', left: '10%', zIndex: 2 }}
                        >
                            <div className="mockup-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="mockup-content">
                                <div className="task-row">
                                    <div className="avatar"></div>
                                    <div className="task-info">
                                        <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '6px' }}></div>
                                        <div style={{ height: '6px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                                    </div>
                                    <div className="task-price">₹500</div>
                                </div>
                                <div className="task-row">
                                    <div className="avatar"></div>
                                    <div className="task-info">
                                        <div style={{ height: '8px', width: '70%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '6px' }}></div>
                                        <div style={{ height: '6px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                                    </div>
                                    <div className="task-price">₹1200</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Small Card 1 */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute', top: '10%', right: '5%',
                                background: 'rgba(20, 20, 25, 0.8)', padding: '15px', borderRadius: '12px',
                                border: '1px solid var(--surface-border)', backdropFilter: 'blur(10px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 3
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                <span style={{ fontSize: '0.8rem', color: '#fff' }}>New Task Posted</span>
                            </div>
                        </motion.div>

                        {/* Floating Small Card 2 */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            style={{
                                position: 'absolute', bottom: '15%', right: '15%',
                                background: 'rgba(20, 20, 25, 0.8)', padding: '15px', borderRadius: '12px',
                                border: '1px solid var(--surface-border)', backdropFilter: 'blur(10px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 1
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>₹850</div>
                                    <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Earned today</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
