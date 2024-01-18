import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    author: String,
    author_id: Schema.Types.ObjectId,
    post_id: Schema.Types.ObjectId,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
