import axios from 'axios';
import type { Task } from '../types/task';


const API = "http://localhost:3000/api";

export const getAllTasks = async (): Promise<Task[]> => {
    const res = await axios.get(`${API}/tasks`);
    return res.data.data;
}

export const createTask = async (data: Partial<Task>) => {
    const res = await axios.post(`${API}/tasks`, data);
    return res.data.data;
};

export const deleteTask = async (id: string) => {
    await axios.delete(`${API}/tasks/${id}`);
};

export const updateTask = async (id: string, data: Partial<Task>) => {
    const res = await axios.patch(`${API}/tasks/${id}`, data);
    return res.data.data;
};

