import {
  Schema,
  Types,
  model,
  models,
  type InferSchemaType,
  type Model,
  type HydratedDocument,
} from "mongoose";

interface Project {
  userId: Types.ObjectId;
  name: string;
  color: string;
  position: number;
  archived: boolean;
}

const ProjectSchema = new Schema({
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
    minLength: 1,
    maxLength: 60,
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9a-fA-F]{6}$/,
    default: "#5a8f00",
  },
  position: { type: Number, default: 0 },
  archived: { type: Boolean, default: false },
});

ProjectSchema.index(
  { userId: 1, name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

export type IProject = InferSchemaType<typeof ProjectSchema>;
export type ProjectDoc = HydratedDocument<IProject>;
export const Project =
  (models.Project as Model<IProject>) ||
  model<IProject>("Project", ProjectSchema);
