import {
  Schema,
  model,
  models,
  Types,
  type InferSchemaType,
  type Model,
  type HydratedDocument,
} from "mongoose";

interface Label {
  userId: Types.ObjectId;
  name: string;
  color: string;
}

const LabelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 1,
      maxLength: 30,
    },
    color: { type: String, match: /^#[0-9a-fA-F]{6}$/, deafault: "#2f7de1" },
  },
  { timestamps: true },
);

LabelSchema.index({ userId: 1, name: 1 }, { unique: true });

export type ILabel = InferSchemaType<typeof LabelSchema>;
export type LabelDoc = HydratedDocument<ILabel>;

export const Label: Model<ILabel> =
  (models.Label as Model<ILabel>) || model<ILabel>("Label", LabelSchema);
