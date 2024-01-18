import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: String,
    author_id: Schema.Types.ObjectId,
    title: String,
    content: String,
    likes: Number,
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
