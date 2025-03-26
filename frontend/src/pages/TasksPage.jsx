import React, { useEffect, useState } from 'react';
import {
    gettasks,
    markCompletedtask,
    updatetask,
    deletetask,
} from '../api/taskApi';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [updatedTaskData, setUpdatedTaskData] = useState({
        title: '',
        description: '',
    });
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await gettasks(token);
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks.');
            } finally {
                setLoading(false);
            }
        };

        if (user && token) fetchTasks();
    }, [user, token]);

    const handleComplete = async (taskId) => {
        try {
            await markCompletedtask(taskId, token);
            setTasks(
                tasks.map((task) =>
                    task._id === taskId ? { ...task, isCompleted: true } : task
                )
            );
            alert('Task marked as completed!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to complete task.');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deletetask(taskId, token);
            setTasks(tasks.filter((task) => task._id !== taskId));
            alert('Task deleted successfully.');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete task.');
        }
    };

    const handleEdit = (task) => {
        setEditTask(task);
        setUpdatedTaskData({
            title: task.title,
            description: task.description,
        });
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await updatetask(editTask._id, updatedTaskData, token);
            alert('Task updated successfully!');
            setTasks(
                tasks.map((task) =>
                    task._id === editTask._id ? { ...task, ...updatedTaskData } : task
                )
            );
            setEditTask(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update task.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (loading)
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;

    if (error)
        return <div className="flex justify-center items-center h-screen text-red-600 font-semibold">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* Search Bar */}
            <SearchBar />

            {/* Edit Task Form */}
            {editTask && (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Task</h2>
                    <form onSubmit={handleUpdateTask}>
                        <input
                            type="text"
                            name="title"
                            value={updatedTaskData.title}
                            onChange={handleChange}
                            className="border p-3 w-full mb-4 rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Task Title"
                            required
                        />
                        <textarea
                            name="description"
                            value={updatedTaskData.description}
                            onChange={handleChange}
                            className="border p-3 w-full mb-4 rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Task Description"
                            rows="4"
                            required
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Update Task
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditTask(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tasks List */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        userRole={user.role}
                        onComplete={handleComplete}
                        onEdit={() => handleEdit(task)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
