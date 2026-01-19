import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';
import { Briefcase, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import './MyTasks.css';

const MyTasks = () => {
    const { user } = useAuth();
    const { tasks, myApplications } = useTasks();
    const isStudent = user?.role === 'student';

    // Filter Tasks based on Role
    let displayedTasks = [];
    if (isStudent) {
        // Show tasks the student has applied to
        displayedTasks = myApplications.map(app => {
            const task = tasks.find(t => t.id === app.taskId);
            return task ? { ...task, status: app.status } : null;
        }).filter(Boolean);
    } else {
        // Show tasks posted by 'You' (or generic mock client tasks for demo content)
        // For MVP, we show tasks posted by 'current-user' OR the generic mock ones if no user ones yet to avoid empty slate.
        displayedTasks = tasks.filter(t => t.postedBy.id === 'current-user' || t.postedBy.id.startsWith('client'));
    }

    const getStatusClass = (status) => {
        if (status.includes('Applied')) return 'status-applied';
        if (status === 'In Progress') return 'status-inprogress';
        if (status === 'Completed') return 'status-completed';
        if (status === 'Open' || status === 'Posted' || status.includes('Applicants')) return 'status-posted';
        return '';
    };

    return (
        <section className="my-tasks-container section-padding container">
            <div className="section-header">
                <h1>My Tasks 📋</h1>
                <p className="subtitle">
                    {isStudent
                        ? 'Track your applications, active gigs, and completed work.'
                        : 'Manage your job postings and review applicants.'}
                </p>
                <div style={{ background: '#fffbeb', color: '#b45309', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', display: 'inline-block', marginTop: '8px', border: '1px solid #fcd34d' }}>
                    ⚠️ Sample data for demo purposes
                </div>
            </div>

            <div className="tasks-grid">
                {displayedTasks.length > 0 ? displayedTasks.map(task => (
                    <div key={task.id} className="task-card-item">
                        <div>
                            <div className="task-card-header">
                                <h3>{task.title}</h3>
                                <span className="task-budget">₹{task.budget}</span>
                            </div>
                            <p className="task-desc-short">{task.description}</p>

                            <div className="task-meta-row">
                                <span className={`status-badge ${getStatusClass(task.status)}`}>
                                    {task.status}
                                </span>
                                <span className="task-date">
                                    <Clock size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
                                    {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>

                        <div className="task-footer">
                            <button className="btn-sm-outline">View Details</button>
                            {isStudent && task.status === 'In Progress' && (
                                <button className="btn-sm-outline" style={{ borderColor: '#10b981', color: '#10b981' }}>Submit Work</button>
                            )}
                            {!isStudent && task.status.includes('Applicants') && (
                                <button className="btn-sm-outline" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none' }}>Review Applicants</button>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        <p>No tasks found. {isStudent ? 'Apply to some gigs!' : 'Post a task to get started.'}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyTasks;
