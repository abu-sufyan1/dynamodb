import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { IUser } from '../models/user.model.js';

const router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser(req.body as IUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get a user by ID
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user = await UserController.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Update a user
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.userId, req.body as Partial<IUser>);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Delete a user
router.delete('/:userId', async (req: Request, res: Response) => {
  try {
    const result = await UserController.deleteUser(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// List all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserController.listUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 