import { loadPosts } from "@/lib/post";
import { loadComments } from "@/lib/comment";

export default async function handler(req, res) {
  const { user_id } = req.query;

  const posts = JSON.parse(await loadPosts({ author_id: user_id }));

  let likes = 0;
  if (posts.length > 0) {
    posts.forEach((post) => {
      likes += post.likes;
    });
  }

  const commentsCount = (await loadComments({ author_id: user_id })).length;

  return res.status(200).json({ posts, likes, commentsCount });
}
