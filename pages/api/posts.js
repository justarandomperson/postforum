import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";

import { loadPosts, uploadPost, deletePost } from "@/lib/post";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const posts = await loadPosts();
        res.status(200).json(posts);
        break;
      case "POST":
        const post_data = req.body;

        if (post_data.content.length > 1250 || post_data.content.length < 5) {
          res.status(200).json({
            error: "Content has to be between 5 and 1250 characters.",
          });
          break;
        }

        const post = await uploadPost(post_data);
        res.status(200).json(post);
        break;
      case "DELETE":
        const delete_data = req.body;
        const delete_res = await deletePost(delete_data);
        res.status(200).json({ success: delete_res });
        break;
    }
  } catch (err) {
    console.log(err);
  }
}
