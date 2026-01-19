import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import './PostTask.css';

const PostTask = () => {
    const navigate = useNavigate();
    const { addTask } = useTasks();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        skills: '' // comma separated string for input, will parse on submit
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const taskPayload = {
                ...formData,
                budget: Number(formData.budget),
                deadline: new Date(formData.deadline),
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
            };

            // Use Context instead of API for MVP demo consistency
            addTask(taskPayload);

            // Simulate network delay
            await new Promise(r => setTimeout(r, 500));

            alert('Task Posted Successfully!');
            navigate('/tasks'); // Redirect to My Tasks to see it
        } catch (err) {
            alert('Failed to post task: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-task-page section-padding container">
            <div className="post-task-card">
                <h1>Post a New Task</h1>
                <p className="subtitle">Connect with talented students instantly.</p>

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label>Project Title</label>
                        <input
                            placeholder="e.g. Redesign Company Logo"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Describe requirements, deliverables, and expectations..."
                            rows={5}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Budget (₹)</label>
                            <input
                                type="number"
                                placeholder="5000"
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Required Skills (comma separated)</label>
                        <input
                            placeholder="e.g. Photoshop, Illustrator, Branding"
                            value={formData.skills}
                            onChange={e => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Posting...' : 'Post Task Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostTask;
