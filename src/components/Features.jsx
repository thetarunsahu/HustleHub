import React from 'react';
import { ShieldCheck, Zap, BookOpen, Users } from 'lucide-react';
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

                <div className="features-grid">
                    <FeatureCard
                        icon={Zap}
                        title="AI Guidance"
                        description="Not sure how to start? Our AI suggests gigs based on your simple skills."
                    />
                    <FeatureCard
                        icon={BookOpen}
                        title="No Portfolio? No Problem"
                        description="Your college reputatation is your resume. Start earning from day one."
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="Safe Payments"
                        description="Escrow-protected payments. Money is released as soon as the task is done."
                    />
                    <FeatureCard
                        icon={Users}
                        title="Campus Exclusive"
                        description="Work with peers you trust. Restricted to verified college emails only."
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
