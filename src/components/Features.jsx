import React from 'react';
import { ShieldCheck, Zap, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import './Features.css';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="feature-card">
        <div className="feature-icon">
            <Icon size={24} />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </div>
);

const Features = () => {
    return (
        <section id="features" className="features section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Why Students choose HustleHub</h2>
                    <p className="section-subtitle">Built specifically for the college lifestyle.</p>
                </div>

                <motion.div
                    className="features-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {[
                        { icon: Zap, title: "AI Guidance", desc: "Not sure how to start? Our AI suggests gigs based on your simple skills." },
                        { icon: BookOpen, title: "No Portfolio? No Problem", desc: "Your college reputatation is your resume. Start earning from day one." },
                        { icon: ShieldCheck, title: "Safe Payments", desc: "Escrow-protected payments. Money is released as soon as the task is done." },
                        { icon: Users, title: "Campus Exclusive", desc: "Work with peers you trust. Restricted to verified college emails only." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.desc}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
