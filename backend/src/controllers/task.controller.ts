import taskModel from '../models/task.model';
import { Request, Response } from 'express'

export const createTask = async (req: Request, res: Response) => {

    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "all fields are required" });
    }

    try {
        const task = await taskModel.create({
            title,
            description,
        });

        return res.status(201).json({
            message: "task created successfully",
            data: task
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const allTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "fetched successfully",
            data: tasks
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getTaskByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            message: "successfully",
            data: task
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await taskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // update fields if provided
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();

        return res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
}

export default { createTask, allTasks, getTaskByID, deleteTask, updateTask };