import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    // "Student Earning OS" Specific Mock Data
    const initialTasks = [
        {
            id: 201,
            title: 'Make PPT for Seminar',
            description: 'Need a clear, professional 10-slide PPT for my final year seminar on AI. Content provided.',
            budget: 300,
            deadline: '2025-11-02',
            status: 'Open',
            postedBy: { name: 'Rahul (Student)', id: 'client1', role: 'student' },
            skills: ['PowerPoint', 'Design'],
            applicants: 2,
            type: 'Micro-Task'
        },
        {
            id: 202,
            title: 'Edit Fest Poster',
            description: 'Urgent: Update dates and venue on the existing Canva/Photoshop file for "TechnoVit".',
            budget: 500,
            deadline: '2025-11-01',
            status: 'Open',
            postedBy: { name: 'Event Head', id: 'client2', role: 'student' },
            skills: ['Canva', 'Photoshop'],
            applicants: 5,
            type: 'Micro-Task'
        },
        {
            id: 203,
            title: 'Debug Python Code',
            description: 'Fix indentation and logic errors in a Python script for Data Science lab.',
            budget: 400,
            deadline: '2025-11-03',
            status: 'Open',
            postedBy: { name: 'Sneha M.', id: 'client3', role: 'student' },
            skills: ['Python', 'Debugging'],
            applicants: 1,
            type: 'Assignment Help'
        },
        {
            id: 204,
            title: 'Format Word Assignment',
            description: 'Format a 15-page assignment according to IEEE standards. Add table of contents.',
            budget: 250,
            deadline: '2025-11-04',
            status: 'In Progress',
            postedBy: { name: 'Library Rep', id: 'client4' },
            skills: ['MS Word', 'Formatting'],
            applicants: 3,
            type: 'Micro-Task'
        },
        {
            id: 205,
            title: 'Instagram Post for Club',
            description: 'Create a reel cover and a story graphic for the Debate Club orientation.',
            budget: 350,
            deadline: '2025-11-02',
            status: 'Open',
            postedBy: { name: 'Debate Club', id: 'client5' },
            skills: ['Canva', 'Social Media'],
            applicants: 8,
            type: 'Creative'
        }
    ];

    /* 
      mockApplications tracks which student applied to which task.
      Format: { taskId: [studentId1, studentId2] }
    */
    const [tasks, setTasks] = useState(initialTasks);
    const [myApplications, setMyApplications] = useState([
        // Mocking that current student applied to these
        { taskId: 204, status: 'Completed' },
    ]);

    const addTask = (newTask) => {
        const task = {
            ...newTask,
            id: Date.now(),
            status: 'Open',
            applicants: 0,
            postedBy: { name: 'You', id: 'current-user' },
            type: 'Posted'
        };
        setTasks([task, ...tasks]);
    };

    const applyToTask = (taskId) => {
        if (myApplications.find(app => app.taskId === taskId)) return;

        // "Dopamine" Effect could be triggered here or in component
        setMyApplications([...myApplications, { taskId, status: 'Applied' }]);

        // Update applicant count locally
        setTasks(tasks.map(t =>
            t.id === taskId ? { ...t, applicants: t.applicants + 1 } : t
        ));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, myApplications, applyToTask, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
