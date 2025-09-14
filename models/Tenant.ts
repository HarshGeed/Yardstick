// models/Tenant.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface ITenant extends Document {
  name: string;
  slug: string;
  plan: "free" | "pro";
  createdAt: Date;
}

const TenantSchema = new Schema<ITenant>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  plan: { type: String, default: "free" },
  createdAt: { type: Date, default: Date.now }
});

export const Tenant: Model<ITenant> =
  mongoose.models?.Tenant || mongoose.model<ITenant>("Tenant", TenantSchema);
