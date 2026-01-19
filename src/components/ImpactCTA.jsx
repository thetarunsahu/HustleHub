import React from 'react';
import './ImpactCTA.css';

const ImpactCTA = ({ onOpenAuth }) => {
    return (
        <section id="impact" className="impact section-padding">
            <div className="impact-bg"></div>
            <div className="container impact-container">
                <div className="impact-stats">
                    <div className="impact-item">
                        <span className="impact-number text-gradient">85%</span>
                        <p>Feel more confident in their skills</p>
                    </div>
                    <div className="impact-item">
                        <span className="impact-number text-gradient">₹5k</span>
                        <p>Average monthly earnings</p>
                    </div>
                    <div className="impact-item">
                        <span className="impact-number text-gradient">100%</span>
                        <p>Safe & Verified Transactions</p>
                    </div>
                </div>

                <div className="final-cta text-center">
                    <h2 className="cta-title">Ready to start earning?</h2>
                    <p className="cta-desc">Join thousands of students turning free time into financial freedom.</p>
                    <div className="cta-buttons">
                        <button className="btn-primary btn-large" onClick={onOpenAuth}>Join HustleHub Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactCTA;
