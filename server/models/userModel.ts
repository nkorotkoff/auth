import mongoose from "mongoose";

export interface IUser {
  login: string;
  email: string;
  password: string;
}

const schema = new mongoose.Schema<IUser>(
  {
    login: {
      type: String,
      require: [true, "Please add a login"],
    },
    email: {
      type: String,
      require: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", schema);
