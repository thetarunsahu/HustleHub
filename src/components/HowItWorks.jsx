import React from 'react';
import { UserPlus, Search, Wallet } from 'lucide-react';
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
                    <Step
                        icon={UserPlus}
                        number="01"
                        title="Create Profile"
                        description="Sign up with your college email. Verify your identity instantly."
                    />
                    <Step
                        icon={Search}
                        number="02"
                        title="Find Tasks"
                        description="Browse simple gigs like note-taking, event help, or tutoring."
                    />
                    <Step
                        icon={Wallet}
                        number="03"
                        title="Get Paid"
                        description="Complete the task and get paid directly to your UPI/Wallet."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
