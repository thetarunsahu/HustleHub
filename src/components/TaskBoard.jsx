import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { Briefcase, Calendar, DollarSign } from 'lucide-react';
import './TaskBoard.css';

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Task Form State
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: ''
    });

    const fetchTasks = async () => {
        try {
            const data = await api.getTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.createTask({
                ...newTask,
                budget: Number(newTask.budget),
                deadline: new Date(newTask.deadline)
            });
            setNewTask({ title: '', description: '', budget: '', deadline: '' });
            fetchTasks(); // Refresh list
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <section className="task-board section-padding">
            <div className="container">
                <h2 className="section-title text-center">Available Gigs</h2>

                {user?.role === 'client' && (
                    <div className="create-task-card">
                        <h3>Post a New Gig</h3>
                        <form onSubmit={handleCreateTask} className="task-form">
                            <input
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                required
                            />
                            <div className="form-row">
                                <input
                                    type="number"
                                    placeholder="Budget (₹)"
                                    value={newTask.budget}
                                    onChange={(e) => setNewTask({ ...newTask, budget: e.target.value })}
                                    required
                                />
                                <input
                                    type="date"
                                    value={newTask.deadline}
                                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="btn-primary" type="submit">Post Task</button>
                        </form>
                    </div>
                )}

                {loading ? (
                    <p className="text-center">Loading tasks...</p>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map(task => (
                            <div key={task._id} className="task-card">
                                <div className="task-header">
                                    <h4>{task.title}</h4>
                                    <span className="task-budget">₹{task.budget}</span>
                                </div>
                                <p className="task-desc">{task.description}</p>
                                <div className="task-footer">
                                    <span className="task-meta">
                                        <Calendar size={14} /> {new Date(task.deadline).toLocaleDateString()}
                                    </span>
                                    <span className="task-meta">
                                        <Briefcase size={14} /> {task.postedBy?.name || 'Client'}
                                    </span>
                                </div>
                                {user?.role === 'student' && (
                                    <button className="btn-secondary full-width">Apply Now</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TaskBoard;
