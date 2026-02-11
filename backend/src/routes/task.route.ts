import express from 'express';
import taskController from '../controllers/task.controller';

const router = express.Router();

router.get("/tasks", taskController.allTasks);
router.post("/tasks", taskController.createTask);
router.get("/tasks/:id", taskController.getTaskByID);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id", taskController.updateTask);

export default router;