import { Response } from 'express';
import { Tag } from '../models/Tag';
import { AuthRequest } from '../middleware/auth';
import { successResponse, createdResponse, errorResponse, notFoundResponse } from '../utils/response';

interface TagBody {
  name: string;
  color?: string;
}

export const getTags = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tags = await Tag.find({ user: req.user._id }).sort({ name: 1 });

    successResponse(res, tags, 'Tags retrieved successfully');
  } catch (error) {
    console.error('Get tags error:', error);
    errorResponse(res, 'Failed to get tags');
  }
};

export const createTag = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, color } = req.body as TagBody;

    // Check if tag with same name already exists
    const existingTag = await Tag.findOne({ name, user: req.user._id });
    if (existingTag) {
      errorResponse(res, 'Tag with this name already exists', 400);
      return;
    }

    const tag = await Tag.create({
      name,
      color: color || '#3B82F6',
      user: req.user._id,
    });

    createdResponse(res, tag, 'Tag created successfully');
  } catch (error) {
    console.error('Create tag error:', error);
    errorResponse(res, 'Failed to create tag');
  }
};

export const deleteTag = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const tag = await Tag.findOneAndDelete({ _id: id, user: req.user._id });

    if (!tag) {
      notFoundResponse(res, 'Tag not found');
      return;
    }

    // Remove tag from all notes
    const { Note } = await import('../models/Note');
    await Note.updateMany(
      { tags: id, user: req.user._id },
      { $pull: { tags: id } }
    );

    successResponse(res, null, 'Tag deleted successfully');
  } catch (error) {
    console.error('Delete tag error:', error);
    errorResponse(res, 'Failed to delete tag');
  }
};
