import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/protectedRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { Home } from '../pages/Home';

import TasksPage from '../pages/TasksPage';
import CreateTaskPage from '../pages/CreateTaskPage';



const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Home />} />

        <Route
            path="/tasks"
            element={
                <ProtectedRoute roles={['Admin', 'Viewer']}>
                    <TasksPage/>
                </ProtectedRoute>
            }
        />
        <Route
            path="/home"
            element={
                <ProtectedRoute roles={['Admin']}>
                    <CreateTaskPage />
                </ProtectedRoute>
            }
        />
        {/* <Route path="/jobs" element={<JobsPage />} /> */}

    </Routes>
);

export default AppRoutes;
