import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import './OnboardingModal.css';

const OnboardingModal = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem('hustlehub_onboarded');
        if (!hasSeen) {
            setIsVisible(true);
        }
    }, []);

    const handleStart = () => {
        setIsVisible(false);
        localStorage.setItem('hustlehub_onboarded', 'true');
        if (onComplete) onComplete();
    };

    if (!isVisible) return null;

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card fade-in-up">
                <div className="icon-burst">🎉</div>
                <h1>Congratulations!</h1>
                <p className="headline">
                    You are eligible to earn your first <span className="highlight">₹500</span> today.
                </p>
                <p className="subtext">
                    HustleHub is the exclusive earning OS for students like you at <strong>MIT ADT</strong>.
                    Let's get your profile ready for paid micro-tasks.
                </p>

                <div className="actions">
                    <button className="btn-primary btn-lg" onClick={handleStart}>
                        Show me how <ArrowRight size={20} />
                    </button>
                    <button className="btn-text" onClick={handleStart}>Skip for now</button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
