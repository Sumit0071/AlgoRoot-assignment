import Task from '../models/task.js';
import User from '../models/user.js';

// Get all tasks
export const gettasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a task as completed
export const markCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Ensure user exists in the database
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mark the task as completed
    task.isCompleted = true;
    await task.save();

    res.json({ message: 'Task marked as completed', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createtask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const user = req.user;
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can create tasks' });
    }

    if (!title || !description) {
      return res.status(400).json({ message: 'Task title and description are required' });
    }

    const newTask = new Task({ title, description, isCompleted: false });
    const createdTask = await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: createdTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing task
export const updatetask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const user = req.user;
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can update tasks' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing task
export const deletetask = async (req, res) => {
  const { id } = req.params;

  try {
    const user = req.user;
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can delete tasks' });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};