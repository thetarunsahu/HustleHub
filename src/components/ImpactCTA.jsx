import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ImpactCTA.css';

const ImpactCTA = ({ onOpenAuth }) => {
    return (
        <section id="impact" className="impact section-padding">
            <div className="impact-bg"></div>
            <div className="container impact-container">

                <motion.div
                    className="impact-stats"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <motion.div
                        className="impact-item"
                        whileHover={{ y: -5 }}
                    >
                        <span className="impact-number text-gradient">85%</span>
                        <p>Feel more confident in their skills</p>
                    </motion.div>
                    <motion.div
                        className="impact-item"
                        whileHover={{ y: -5 }}
                    >
                        <span className="impact-number text-gradient">₹5k</span>
                        <p>Average weekly earnings</p>
                    </motion.div>
                    <motion.div
                        className="impact-item"
                        whileHover={{ y: -5 }}
                    >
                        <span className="impact-number text-gradient">100%</span>
                        <p>Safe & Verified Transactions</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="final-cta text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="cta-title">Ready to start earning?</h2>
                    <p className="cta-desc">Join thousands of students turning free time into financial freedom.</p>
                    <div className="cta-buttons">
                        <button className="btn-primary btn-large magnetic-hover" onClick={onOpenAuth}>
                            Join HustleHub Now <ArrowRight />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ImpactCTA;
