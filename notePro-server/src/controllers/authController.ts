import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import {
  successResponse,
  createdResponse,
  errorResponse,
  validationErrorResponse,
} from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

interface RegisterBody {
  email: string;
  password: string;
  username: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body as RegisterBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      validationErrorResponse(res, 'Email already registered');
      return;
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      username,
    });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    createdResponse(res, { user: { id: user._id, email: user.email, username: user.username }, token }, 'User registered successfully');
  } catch (error) {
    console.error('Register error:', error);
    errorResponse(res, 'Failed to register user');
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginBody;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      validationErrorResponse(res, 'Invalid email or password');
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      validationErrorResponse(res, 'Invalid email or password');
      return;
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    successResponse(res, { user: { id: user._id, email: user.email, username: user.username }, token }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 'Failed to login');
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }

    successResponse(res, { id: user._id, email: user.email, username: user.username }, 'User retrieved successfully');
  } catch (error) {
    console.error('Get me error:', error);
    errorResponse(res, 'Failed to get user');
  }
};
