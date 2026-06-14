import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  username: string;
  email: string;
  hashedPassword: string;
  role: "user" | "admin";
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    hashedPassword: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("hashedPassword")) return;
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, 12);
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.hashedPassword);
};

userSchema.set("toJSON", {
  transform: (_, ret: any) => {
    delete ret.hashedPassword;
    delete ret.__v;
    return ret;
  },
});

const User = models.User || model("User", userSchema);

export default User;
