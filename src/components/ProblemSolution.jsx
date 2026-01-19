import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    return (
        <section className="problem-solution section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Why it's hard to earn?</h2>
                    <p className="section-subtitle">The traditional freelance market is broken for students.</p>
                </div>

                <div className="comparison-grid">
                    {/* Problem Side */}
                    {/* Problem Side */}
                    <motion.div
                        className="problem-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="card-title text-muted">The Old Way</h3>
                        <ul className="comparison-list">
                            <li>
                                <XCircle className="icon-red" size={24} />
                                <div>
                                    <h4>Need a Portfolio</h4>
                                    <p>Clients expect years of experience you don't have yet.</p>
                                </div>
                            </li>
                            <li>
                                <ShieldAlert className="icon-red" size={24} />
                                <div>
                                    <h4>Risk of Scams</h4>
                                    <p>Unverified clients and payment uncertainties.</p>
                                </div>
                            </li>
                            <li>
                                <XCircle className="icon-red" size={24} />
                                <div>
                                    <h4>Global Competition</h4>
                                    <p>Competing with professionals worldwide driving prices down.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Solution Side */}
                    <motion.div
                        className="solution-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="solution-glow"></div>
                        <h3 className="card-title text-gradient">The HustleHub Way</h3>
                        <ul className="comparison-list">
                            <li>
                                <CheckCircle className="icon-green" size={24} />
                                <div>
                                    <h4>No Portfolio Needed</h4>
                                    <p>Get hired based on simple skills and college reputation.</p>
                                </div>
                            </li>
                            <li>
                                <Award className="icon-green" size={24} />
                                <div>
                                    <h4>Campus Exclusive</h4>
                                    <p>Only verified students and local tasks. Safe & Secure.</p>
                                </div>
                            </li>
                            <li>
                                <CheckCircle className="icon-green" size={24} />
                                <div>
                                    <h4>Fair Pay</h4>
                                    <p>Standardized rates for tasks. No bidding wars.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
