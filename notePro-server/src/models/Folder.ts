import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  user: Types.ObjectId;
  parentFolder?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new Schema<IFolder>(
  {
    name: {
      type: String,
      required: [true, 'Folder name is required'],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentFolder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
folderSchema.index({ user: 1, parentFolder: 1 });

export const Folder = mongoose.model<IFolder>('Folder', folderSchema);
