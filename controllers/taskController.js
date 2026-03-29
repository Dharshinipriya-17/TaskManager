const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server issue', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing title or description' });
    }

    const task = await Task.create({
      title,
      description,
      status: 'pending',
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server issue', error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { status } = req.body;

    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: status || task.status },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server issue', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Task deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server issue', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
