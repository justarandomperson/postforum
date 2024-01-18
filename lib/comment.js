import connectMongoDB from "./mongodb";

import Comment from "@/models/comment";
import Post from "@/models/post";

export async function loadComments(filter) {
  const comments = await Comment.find(filter);

  return comments;
}

export async function uploadComment(data) {
  const comment = await Comment.create({ ...data });
  const post = await Post.findById(data.post_id);
  const comments = post.comments;
  comments.push(comment);

  post.save();

  return comment;
}

export async function deleteComment(data) {
  try {
    await connectMongoDB();

    const comment = await Comment.findById(data.comment_id);
    const post = await Post.findById(comment.post_id);
    if (comment.author_id != data.user_id) {
      return res.status(401).json({
        error: "You are not authorized to perform this action.",
      });
    }

    post.comments = post.comments.filter((id) => id != data.comment_id);
    await comment.deleteOne();
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
}
