// models/Note.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  title: string;
  body: string;
  tenantId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const Note: Model<INote> =
  mongoose.models?.Note || mongoose.model<INote>("Note", NoteSchema);
