import mongoose, { Schema, model, models } from "mongoose";

interface IRefreshToken {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
  replacedByToken?: string;
  userAgent?: string;
  ip?: string;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true, unique: true, index: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    expiresAt: { type: Date, required: true },
    isRevoked: { type: Boolean, default: false },
    replacedByToken: { type: String },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true },
);

RefreshTokenSchema.index({ expiresAt: -1 }, { expireAfterSeconds: 0 });

RefreshTokenSchema.index({ userId: 1, isRevoked: 1 });

const RefreshToken =
  models.RefreshToken || model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
