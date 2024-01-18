import { isLiked } from "@/lib/user";

export default async function handler(req, res) {
  const { user_id, liked_post } = req.query;

  const liked = await isLiked(liked_post, user_id);

  return res.status(200).json({ liked });
}
