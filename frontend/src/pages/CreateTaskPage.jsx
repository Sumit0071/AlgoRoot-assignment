import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createtask } from '../api/taskApi';
import { useNavigate } from 'react-router-dom'; // Use Navigate hook for redirection

export default function CreateTaskPage() {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        isCompleted: false,
    });
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Corrected from `Navigate` to `useNavigate`

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createtask(taskData, token);
            alert('Task created successfully!');
            navigate('/tasks');
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Create a New Task
                </h2>
                <p className="text-center text-sm text-gray-500 mb-4">
                    Fill in the details below to create a new task.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                                Task Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={taskData.title}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                                Task Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={taskData.description}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Provide a detailed task description"
                                rows="4"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300"
                            >
                                Create Task
                            </button>
                        </div>
                        
                        {/* New Button to View Existing Tasks */}
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate('/tasks')}
                                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 focus:outline-none transition duration-300"
                            >
                                View Existing Tasks
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
