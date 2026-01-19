import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    DollarSign, Briefcase, Clock, Star, TrendingUp, Users, CheckCircle,
    Circle, ArrowRight, Zap, Target, BookOpen, Activity, Award, Trophy, ChevronRight, BarChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import OnboardingModal from './OnboardingModal';
import './Dashboard.css';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="stat-card">
        <div className={`stat-icon ${color}`}>
            <Icon size={24} />
        </div>
        <div className="stat-info">
            <h3>{value}</h3>
            <p>{label}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const isStudent = user?.role === 'student';

    // "Hustle Journey" State Calculation
    const hasSkills = user?.skills?.length > 0;
    const hasApplied = false; // Mock
    const hasEarned = false; // Mock
    const hasWithdrawn = false; // Mock

    const journeySteps = [
        { id: 1, label: 'Add your first skill', done: hasSkills, link: '/profile' },
        { id: 2, label: 'Apply to a micro-task', done: hasApplied, link: '/find-work' },
        { id: 3, label: 'Earn your first ₹500', done: hasEarned, link: '/find-work' },
        { id: 4, label: 'Add Bank & Withdraw', done: hasWithdrawn, link: '/payments' },
    ];

    return (
        <div className="dashboard section-padding container">
            <OnboardingModal />

            {/* College Identity Banner */}
            {isStudent && (
                <div className="college-banner fade-in">
                    <div className="college-info">
                        <div className="college-icon">🏫</div>
                        <div>
                            <h4>MIT ADT University Hub</h4>
                            <p>12 students from your college earned <strong>₹8,400</strong> this week!</p>
                        </div>
                    </div>
                    <Link to="/network" className="btn-xs">View Peers</Link>
                </div>
            )}

            {/* Motivation Banner (New) */}
            <motion.div
                className="motivation-banner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="motivation-content">
                    <Trophy size={48} className="trophy-icon" />
                    <div>
                        <h3>You're in the top 12% of Hustlers! 🚀</h3>
                        <p>Complete 2 more tasks to reach the "Campus Pro" milestone.</p>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Hustle Journey Tracker */}
            {isStudent && (
                <div className="journey-track-card">
                    <div className="journey-header">
                        <h3><Target size={20} color="#f59e0b" /> Your Hustle Journey</h3>
                        <span className="progress-badge">Step {journeySteps.filter(s => s.done).length + 1}/4</span>
                    </div>
                    <div className="steps-row">
                        {journeySteps.map((step, idx) => (
                            <Link to={step.link} key={step.id} className={`journey-step ${step.done ? 'completed' : 'active'}`}>
                                <div className="step-check">
                                    {step.done ? <CheckCircle size={18} /> : <Circle size={18} />}
                                </div>
                                <span className="step-label">{step.label}</span>
                                {!step.done && idx === journeySteps.findIndex(s => !s.done) && <ArrowRight size={14} className="step-arrow" />}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Greetings & Stats */}
            <div className="stats-header">
                <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
                <p className="text-muted">Here is your earning snapshot.</p>
            </div>

            <div className="stats-grid">
                {isStudent ? (
                    <>
                        <StatCard icon={DollarSign} label="Total Earnings" value="₹0" color="green" />
                        <StatCard icon={Briefcase} label="Active Applications" value="2" color="blue" />
                        <StatCard icon={Zap} label="Profile Strength" value="65%" color="purple" />
                    </>
                ) : (
                    <>
                        <StatCard icon={Briefcase} label="Active Tasks" value="5" color="blue" />
                        <StatCard icon={Users} label="Applicants" value="12" color="purple" />
                        <StatCard icon={DollarSign} label="Total Spent" value="₹45,000" color="green" />
                    </>
                )}
            </div>

            <div className="dashboard-content">
                <div className="main-section">
                    <h2>{isStudent ? 'Micro-Tasks for You' : 'Recent Updates'}</h2>
                    <div className="card-list">
                        {isStudent ? (
                            // Hardcoded Micro-Tasks Highlight for Dashboard
                            <>
                                <div className="dashboard-card hover-scale">
                                    <div className="card-header">
                                        <h3>Make PPT for Seminar</h3>
                                        <span className="price-tag">₹300</span>
                                    </div>
                                    <p>Need a professional 10-slide PPT. Content ready.</p>
                                    <div className="card-footer">
                                        <span className="tag">PowerPoint</span>
                                        <Link to="/find-work" className="btn-sm">Apply Now</Link>
                                    </div>
                                </div>
                                <div className="dashboard-card hover-scale">
                                    <div className="card-header">
                                        <h3>Review Annual Fest Poster</h3>
                                        <span className="price-tag">₹150</span>
                                    </div>
                                    <p>Check spelling and layout alignment.</p>
                                    <div className="card-footer">
                                        <span className="tag">Design</span>
                                        <Link to="/find-work" className="btn-sm">Apply Now</Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            [1, 2].map(i => (
                                <div key={i} className="dashboard-card user-card hover-scale">
                                    <div className="user-info">
                                        <div className="avatar-sm bg-gradient">AS</div>
                                        <div>
                                            <h3>Alice Smith applied to "Logo Design"</h3>
                                            <p className="time-ago">2 hours ago</p>
                                        </div>
                                    </div>
                                    <Link to="/tasks" className="btn-outline-sm">Review</Link>
                                </div>
                            ))
                        )}
                    </div>

                    {/* NEW: Tech & Industry Updates */}
                    <motion.div
                        className="dashboard-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="section-header-sm"><Activity size={18} className="text-accent" /> Tech & Industry Updates</h3>
                        <div className="horizontal-scroll-container">
                            <div className="info-card">
                                <h4>React Demand 📈</h4>
                                <p>Demand for React developers up by 18% this month.</p>
                            </div>
                            <div className="info-card">
                                <h4>AI Tools 2026 🤖</h4>
                                <p>Top 5 AI tools freelancers are using to double speed.</p>
                            </div>
                            <div className="info-card">
                                <h4>Freelance Rates 💰</h4>
                                <p>Average hourly rate for students hits ₹500/hr.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* NEW: Placement & Career Signals */}
                    <motion.div
                        className="dashboard-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <h3 className="section-header-sm"><Briefcase size={18} className="text-secondary" /> Placement Signals</h3>
                        <div className="signals-grid">
                            <div className="signal-card">
                                <div className="signal-icon bg-blue-soft"><Briefcase size={20} /></div>
                                <div>
                                    <h4>Companies Hiring Interns</h4>
                                    <p>TechCorp, DesignStudio + 3 others</p>
                                </div>
                            </div>
                            <div className="signal-card">
                                <div className="signal-icon bg-green-soft"><DollarSign size={20} /></div>
                                <div>
                                    <h4>Skills for ₹50k/mo</h4>
                                    <p>Full-Stack Dev, Video Editing</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* NEW: Profit & Loss Tracker */}
                    <motion.div
                        className="dashboard-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="section-header-sm"><BarChart size={18} className="text-green" /> Profit & Loss Tracker</h3>
                        <div className="pnl-container">
                            <div className="pnl-card">
                                <span className="pnl-label">Total Earned</span>
                                <span className="pnl-value positive">₹12,450</span>
                            </div>
                            <div className="pnl-card">
                                <span className="pnl-label">Time Invested</span>
                                <span className="pnl-value">42 Hrs</span>
                            </div>
                            <div className="pnl-card">
                                <span className="pnl-label">Net Gain</span>
                                <span className="pnl-value text-accent">₹296 / hr</span>
                            </div>

                            {/* Simple Visual Chart */}
                            <div className="pnl-chart">
                                <span className="chart-label">Last 6 Months</span>
                                <div className="chart-bars">
                                    <div className="bar" style={{ height: '40%' }}></div>
                                    <div className="bar" style={{ height: '60%' }}></div>
                                    <div className="bar" style={{ height: '30%' }}></div>
                                    <div className="bar" style={{ height: '80%' }}></div>
                                    <div className="bar" style={{ height: '50%' }}></div>
                                    <div className="bar active" style={{ height: '90%' }}></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                <div className="sidebar-section">
                    <div className="action-box">
                        <h3>Quick Actions</h3>
                        {isStudent ? (
                            <div className="action-buttons">
                                <Link to="/find-work" className="btn-primary full-width">Find Work</Link>
                                <Link to="/portfolio" className="btn-secondary full-width">Update Portfolio</Link>
                            </div>
                        ) : (
                            <div className="action-buttons">
                                <Link to="/post-task" className="btn-primary full-width">Post New Task</Link>
                                <Link to="/find-talent" className="btn-secondary full-width">Browse Students</Link>
                            </div>
                        )}
                    </div>

                    {/* NEW: Skill Growth Tracker */}
                    <div className="sidebar-widget">
                        <h3>Your Skill Strength</h3>
                        <div className="skill-progress-list">
                            <div className="skill-progress-item">
                                <div className="flex-between">
                                    <span>Web Dev</span>
                                    <span className="text-muted">75%</span>
                                </div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: '75%', background: '#8b5cf6' }}></div></div>
                            </div>
                            <div className="skill-progress-item">
                                <div className="flex-between">
                                    <span>UI/UX</span>
                                    <span className="text-muted">40%</span>
                                </div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: '40%', background: '#3b82f6' }}></div></div>
                            </div>
                            <div className="skill-progress-item">
                                <div className="flex-between">
                                    <span>Content</span>
                                    <span className="text-muted">20%</span>
                                </div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: '20%', background: '#10b981' }}></div></div>
                            </div>
                        </div>
                        <button className="btn-text-only">+ Add / Update Skills</button>
                    </div>

                    {/* NEW: Daily Opportunities Feed */}
                    <div className="sidebar-widget">
                        <h3>Daily Feed 🔔</h3>
                        <div className="feed-list">
                            <div className="feed-item">
                                <div className="feed-dot"></div>
                                <p>New task <strong>"Logo Design"</strong> posted 5 mins ago</p>
                            </div>
                            <div className="feed-item">
                                <div className="feed-dot blue"></div>
                                <p>Client <strong>DesignCo</strong> viewed your profile</p>
                            </div>
                            <div className="feed-item">
                                <div className="feed-dot green"></div>
                                <p>Recommended: <strong>Blog Writing</strong> for you</p>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Learning Nudge */}
                    <div className="sidebar-widget learning-nudge">
                        <div className="flex-center-start gap-2">
                            <BookOpen size={20} className="text-accent" />
                            <h4>Rapid Learning</h4>
                        </div>
                        <p className="nudge-text">Spend 15 mins today to master <strong>Figma Auto-Layout</strong>.</p>
                        <button className="btn-outline-xs full-width">Continue Learning</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
