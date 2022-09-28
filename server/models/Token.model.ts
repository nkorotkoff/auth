import mongoose, { Schema } from "mongoose";

const SchemaToken = mongoose.Schema;

const tokenSchema = new SchemaToken({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
});

export default mongoose.model("Token", tokenSchema);
