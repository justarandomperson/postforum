import connectMongoDB from "@/lib/mongodb"

import Post from "@/models/post"
import Comment from "@/models/comment"
import User from "@/models/user"

export async function loadPosts(filter) {
  await connectMongoDB()
  const posts = JSON.stringify(await Post.find(filter))
  return posts
}

export async function loadPost(id) {
  await connectMongoDB()
  const post = await Post.findById(id)
  if (!post) return null
  const populatedPost = await post.populate("comments")

  const post_data = JSON.stringify(populatedPost)
  return post_data
}

export async function uploadPost(data) {
  await connectMongoDB()

  const post = await Post.create({
    ...data,
    comments: [],
    likes: 0,
  })
  return post
}

export async function deletePost(data) {
  try {
    await connectMongoDB()

    const post = await Post.findById(data.post_id)
    if (post.author_id != data.user_id) {
      return res.status(401).json({
        error: "You are not authorized to perform this action.",
      })
    }

    await Comment.deleteMany({ post_id: post._id })
    await post.deleteOne()
    return true
  } catch (err) {
    console.log(err)
    return err
  }
}
