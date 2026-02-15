import { Response } from 'express';
import { Note } from '../models/Note';
import { AuthRequest } from '../middleware/auth';
import { successResponse, createdResponse, errorResponse, notFoundResponse } from '../utils/response';

interface NoteBody {
  title: string;
  content?: string;
  folder?: string;
  tags?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
}

export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { folder, tag, search, archived } = req.query;

    const query: any = { user: req.user._id };

    // Filter by archived status
    if (archived === 'true') {
      query.isArchived = true;
    } else {
      query.isArchived = false;
    }

    // Filter by folder
    if (folder) {
      query.folder = folder;
    }

    // Filter by tag
    if (tag) {
      query.tags = tag;
    }

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(query)
      .populate('tags', 'name color')
      .sort({ isPinned: -1, createdAt: -1 });

    successResponse(res, notes, 'Notes retrieved successfully');
  } catch (error) {
    console.error('Get notes error:', error);
    errorResponse(res, 'Failed to get notes');
  }
};

export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, folder, tags, isPinned, isArchived } = req.body as NoteBody;

    const note = await Note.create({
      title,
      content: content || '',
      user: req.user._id,
      folder: folder || null,
      tags: tags || [],
      isPinned: isPinned || false,
      isArchived: isArchived || false,
    });

    await note.populate('tags', 'name color');

    createdResponse(res, note, 'Note created successfully');
  } catch (error) {
    console.error('Create note error:', error);
    errorResponse(res, 'Failed to create note');
  }
};

export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, folder, tags, isPinned, isArchived } = req.body as NoteBody;

    const note = await Note.findOne({ _id: id, user: req.user._id });

    if (!note) {
      notFoundResponse(res, 'Note not found');
      return;
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (folder !== undefined) note.folder = folder as any;
    if (tags !== undefined) note.tags = tags as any;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;

    await note.save();
    await note.populate('tags', 'name color');

    successResponse(res, note, 'Note updated successfully');
  } catch (error) {
    console.error('Update note error:', error);
    errorResponse(res, 'Failed to update note');
  }
};

export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

    if (!note) {
      notFoundResponse(res, 'Note not found');
      return;
    }

    successResponse(res, null, 'Note deleted successfully');
  } catch (error) {
    console.error('Delete note error:', error);
    errorResponse(res, 'Failed to delete note');
  }
};
