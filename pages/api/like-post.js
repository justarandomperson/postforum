import { likePost } from "@/lib/user";

export default async function handler(req, res) {
  const { post_id, user_id } = req.body;
  const result = await likePost(post_id, user_id);

  res.status(200).json({ success: result });
}
