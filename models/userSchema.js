import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const users = models.users || model("users", userSchema);

export default users;