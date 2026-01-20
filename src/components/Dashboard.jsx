

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    DollarSign, Briefcase, Clock, Star, TrendingUp, Users, CheckCircle,
    Circle, ArrowRight, Zap, Target, BookOpen, Activity, Award, Trophy, ChevronRight, BarChart, Lock, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import OnboardingModal from './OnboardingModal';
import './Dashboard.css';

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = "" }) => {
    return <span>{prefix}{value}</span>; // Placeholder for complex count-up
};

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <motion.div
        className="stat-card"
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
    >
        <div className={`stat-icon ${color}`}>
            <Icon size={24} />
        </div>
        <div className="stat-info">
            <h3><AnimatedCounter value={value} /></h3>
            <p>{label}</p>
            {trend && <span className="stat-trend text-green">+{trend}%</span>}
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const isStudent = user?.role === 'student';

    // Mock Weekly Earnings Data
    const earningsData = [30, 45, 25, 60, 75, 50, 80];

    return (
        <div className="dashboard section-padding container">
            <OnboardingModal />

            {/* Header */}
            <header className="dashboard-header-row">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        Welcome back, {user?.name?.split(' ')[0]} ⚡
                    </motion.h1>
                    <p className="text-muted">You're on a 3-day streak! Keep it up.</p>
                </div>
                {isStudent && (
                    <motion.div
                        className="college-pro-badge"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="badge-icon">🏫</div>
                        <div className="badge-info">
                            <span className="badge-title">MIT ADT Hub</span>
                            <span className="badge-stat">Top 10% Active</span>
                        </div>
                    </motion.div>
                )}
            </header>

            {/* Today's Focus Section */}
            <section className="focus-section mb-4">
                <h3 className="section-title-sm">TODAY'S FOCUS</h3>
                <div className="focus-grid">
                    <motion.div
                        className="focus-card primary"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="focus-content">
                            <Target className="text-accent" size={20} />
                            <div>
                                <h4>Complete Profile</h4>
                                <p>Add 2 more skills to reach 100%.</p>
                            </div>
                        </div>
                        <Link to="/profile" className="btn-xs-primary">Do it Now</Link>
                    </motion.div>
                    <motion.div
                        className="focus-card secondary"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="focus-content">
                            <Briefcase className="text-blue" size={20} />
                            <div>
                                <h4>Apply to 3 Jobs</h4>
                                <p>Increase your chances by 50%.</p>
                            </div>
                        </div>
                        <Link to="/find-work" className="btn-xs-outline">View Jobs</Link>
                    </motion.div>
                </div>
            </section>

            <div className="dashboard-grid">
                {/* Main Content */}
                <div className="dashboard-main">

                    {/* Stats Row */}
                    <div className="stats-grid">
                        {isStudent ? (
                            <>
                                <StatCard icon={DollarSign} label="Earnings" value="₹2,400" color="green" trend="12" />
                                <StatCard icon={Briefcase} label="Active Applications" value="2" color="blue" />
                                <StatCard icon={Zap} label="Profile Score" value="85%" color="purple" trend="5" />
                            </>
                        ) : (
                            <>
                                <StatCard icon={Briefcase} label="Active Tasks" value="5" color="blue" />
                                <StatCard icon={Users} label="Applicants" value="12" color="purple" trend="8" />
                                <StatCard icon={DollarSign} label="Total Spend" value="₹45k" color="green" />
                            </>
                        )}
                    </div>

                    {/* Level System / Gamification */}
                    <motion.div
                        className="gamification-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="panel-header">
                            <div>
                                <h3>Level 2 Hustler 🚀</h3>
                                <p>Next Reward: "Verified Campus Pro" Badge</p>
                            </div>
                            <span className="level-xp">850 / 1000 XP</span>
                        </div>

                        <div className="level-progress-track">
                            <motion.div
                                className="level-progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>

                        <div className="badges-row">
                            <div className="badge-item unlocked">
                                <div className="badge-circle"><Star size={16} /></div>
                                <span>Newbie</span>
                            </div>
                            <div className="badge-item unlocked">
                                <div className="badge-circle"><Zap size={16} /></div>
                                <span>Hustler</span>
                            </div>
                            <div className="badge-item locked">
                                <div className="badge-circle"><Lock size={16} /></div>
                                <span>Pro</span>
                            </div>
                            <div className="badge-item locked">
                                <div className="badge-circle"><Lock size={16} /></div>
                                <span>Master</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Opportunities / Activity */}
                    <div className="content-section">
                        <div className="section-head">
                            <h2>{isStudent ? 'Recommended for You' : 'Recent Activity'}</h2>
                            <Link to={isStudent ? "/find-work" : "/tasks"} className="link-more">View All <ChevronRight size={16} /></Link>
                        </div>
                        <div className="card-list">
                            {/* Reusing existing logic but with refreshed styling hook in CSS */}
                            <div className="dashboard-card hover-glow">
                                <div className="card-badge green">98% Match</div>
                                <div className="card-header">
                                    <h3>Make PPT for Seminar</h3>
                                    <span className="price-tag">₹300</span>
                                </div>
                                <p className="text-sm text-secondary">Need a professional 10-slide PPT. Content ready.</p>
                                <div className="card-footer">
                                    <div className="tags-row">
                                        <span className="tag">PowerPoint</span>
                                        <span className="tag">Design</span>
                                    </div>
                                    <Link to="/find-work" className="btn-sm">Apply</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="dashboard-sidebar">

                    {/* Animated Earnings Chart */}
                    <div className="sidebar-widget earning-widget">
                        <h3>Earnings Trend 📈</h3>
                        <div className="bar-chart">
                            {earningsData.map((height, i) => (
                                <div key={i} className="bar-wrapper">
                                    <motion.div
                                        className="bar"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="chart-footer">
                            <span>Mon</span>
                            <span>Sun</span>
                        </div>
                        <div className="total-earnings">
                            <h4>+₹1,200</h4>
                            <span>this week</span>
                        </div>
                    </div>

                    {/* Helper Widget */}
                    <div className="sidebar-widget helper-widget">
                        <div className="helper-icon"><HelpCircle size={24} /></div>
                        <div>
                            <h4>Stuck?</h4>
                            <p className="text-xs">Ask our AI assistant for tips on proposals.</p>
                        </div>
                        <button className="btn-icon-only"><ChevronRight /></button>
                    </div>

                    {/* Community */}
                    <div className="sidebar-widget">
                        <h3>Campus Buzz</h3>
                        <div className="feed-list">
                            <div className="feed-item">
                                <div className="feed-dot"></div>
                                <p><strong>Hackathon</strong> starts in 2 days!</p>
                            </div>
                            <div className="feed-item">
                                <div className="feed-dot blue"></div>
                                <p><strong>Design Club</strong> meeting at 5 PM.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
