import React from 'react';
import { UserPlus, Search, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const Step = ({ icon: Icon, number, title, description }) => (
    <div className="step-card">
        <div className="step-number">{number}</div>
        <div className="step-icon-wrapper">
            <Icon size={32} />
        </div>
        <h3 className="step-title">{title}</h3>
        <p className="step-desc">{description}</p>
    </div>
);

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-it-works section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Earning made simple</h2>
                    <p className="section-subtitle">From signup to payout in 3 steps.</p>
                </div>

                <div className="steps-container">
                    <div className="steps-line"></div>
                    {[
                        { icon: UserPlus, title: "Create Profile", desc: "Sign up with your college email. Verify your identity instantly." },
                        { icon: Search, title: "Find Tasks", desc: "Browse simple gigs like note-taking, event help, or tutoring." },
                        { icon: Wallet, title: "Get Paid", desc: "Complete the task and get paid directly to your UPI/Wallet." }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Step
                                icon={step.icon}
                                number={`0${index + 1}`}
                                title={step.title}
                                description={step.desc}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
