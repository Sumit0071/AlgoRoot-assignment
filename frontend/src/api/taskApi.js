import axios from 'axios';

const BaseUrl = import.meta.env.VITE_BACKEND_URL;

export const gettasks = async (token) => {
    return axios.get(`${BaseUrl}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createtask = async (taskData, token) => {
    return axios.post(`${BaseUrl}/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const markCompletedtask = async (taskId, token) => {
    return axios.post(`${BaseUrl}/api/tasks/${taskId}/completed`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updatetask = async (taskId, taskData, token) => {
    return axios.post(`${BaseUrl}/api/tasks/${taskId}/`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deletetask = async (taskId, token) => {
    return axios.post(`${BaseUrl}/api/tasks/${taskId}/delete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
