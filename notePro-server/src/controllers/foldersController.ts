import { Response } from 'express';
import { Folder } from '../models/Folder';
import { AuthRequest } from '../middleware/auth';
import { successResponse, createdResponse, errorResponse, notFoundResponse } from '../utils/response';

interface FolderBody {
  name: string;
  parentFolder?: string;
}

export const getFolders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { parentFolder } = req.query;

    const query: any = { user: req.user._id };

    if (parentFolder) {
      query.parentFolder = parentFolder;
    } else {
      query.parentFolder = null;
    }

    const folders = await Folder.find(query).sort({ name: 1 });

    successResponse(res, folders, 'Folders retrieved successfully');
  } catch (error) {
    console.error('Get folders error:', error);
    errorResponse(res, 'Failed to get folders');
  }
};

export const createFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, parentFolder } = req.body as FolderBody;

    // Check if parent folder exists and belongs to user
    if (parentFolder) {
      const parent = await Folder.findOne({ _id: parentFolder, user: req.user._id });
      if (!parent) {
        notFoundResponse(res, 'Parent folder not found');
        return;
      }
    }

    const folder = await Folder.create({
      name,
      user: req.user._id,
      parentFolder: parentFolder || null,
    });

    createdResponse(res, folder, 'Folder created successfully');
  } catch (error) {
    console.error('Create folder error:', error);
    errorResponse(res, 'Failed to create folder');
  }
};

export const updateFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, parentFolder } = req.body as FolderBody;

    const folder = await Folder.findOne({ _id: id, user: req.user._id });

    if (!folder) {
      notFoundResponse(res, 'Folder not found');
      return;
    }

    // Check if parent folder exists and belongs to user (if provided)
    if (parentFolder) {
      const parent = await Folder.findOne({ _id: parentFolder, user: req.user._id });
      if (!parent) {
        notFoundResponse(res, 'Parent folder not found');
        return;
      }
      // Prevent setting a folder as its own parent
      if (parentFolder === id) {
        errorResponse(res, 'Cannot set folder as its own parent', 400);
        return;
      }
      folder.parentFolder = parentFolder as any;
    } else if (parentFolder === null) {
      folder.parentFolder = null as any;
    }

    if (name !== undefined) folder.name = name;

    await folder.save();

    successResponse(res, folder, 'Folder updated successfully');
  } catch (error) {
    console.error('Update folder error:', error);
    errorResponse(res, 'Failed to update folder');
  }
};

export const deleteFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if folder has child folders
    const childFolders = await Folder.countDocuments({ parentFolder: id, user: req.user._id });
    if (childFolders > 0) {
      errorResponse(res, 'Cannot delete folder with child folders', 400);
      return;
    }

    const folder = await Folder.findOneAndDelete({ _id: id, user: req.user._id });

    if (!folder) {
      notFoundResponse(res, 'Folder not found');
      return;
    }

    successResponse(res, null, 'Folder deleted successfully');
  } catch (error) {
    console.error('Delete folder error:', error);
    errorResponse(res, 'Failed to delete folder');
  }
};
