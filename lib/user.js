import connectMongoDB from "./mongodb";
import User from "@/models/user";
import Post from "@/models/post";
import Comment from "@/models/comment";

export async function isLiked(post_id, user_id) {
  try {
    await connectMongoDB();
    const user = await User.findById(user_id);

    if (!user) {
      return null;
    }

    const liked = user.likedPosts.find((likedPost) => likedPost == post_id);
    return (liked && true) || false;
  } catch (err) {
    console.log(err);
  }
}

export async function likePost(post_id, user_id) {
  try {
    await connectMongoDB();
    const post = await Post.findById(post_id);
    const user = await User.findById(user_id);

    const liked = user.likedPosts.find((likedPost) => likedPost == post_id);

    if (!user) {
      return false;
    }

    if (liked) {
      post.likes -= 1;
      user.likedPosts.splice(liked, 1);
    } else {
      post.likes += 1;
      user.likedPosts.push(post_id);
    }

    await post.save();
    await user.save();

    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function likeComment(comment_id, user_id) {
  try {
    await connectMongoDB();
    const comment = await Comment.findById(comment_id);
    const user = await User.findById(user_id);

    const liked = user.likedComments.find(
      (likedComment) => likedComment == comment_id
    );

    if (!user) {
      return false;
    }

    if (liked) {
      comment.likes -= 1;
      user.likedComments.splice(liked, 1);
    } else {
      comment.likes += 1;
      user.likedComments.push(comment_id);
    }

    comment.save();
    user.save();

    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
}
