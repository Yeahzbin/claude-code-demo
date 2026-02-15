import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITag extends Document {
  name: string;
  color: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      trim: true,
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
tagSchema.index({ user: 1, name: 1 });

export const Tag = mongoose.model<ITag>('Tag', tagSchema);
