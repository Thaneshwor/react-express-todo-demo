import express from 'express';
import { createTask, getAllTasks, deleteTask, updateTask, getTaskByStatus } from '../controllers/taskController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// tasks Router

router.post('/tasks', verifyAuth, createTask);
router.get('/tasks', verifyAuth, getAllTasks);
router.get('/tasks/:status', verifyAuth, getTaskByStatus);
router.delete('/tasks/:task_id', verifyAuth, deleteTask);
router.put('/tasks/:task_id', verifyAuth, updateTask);

export default router;
