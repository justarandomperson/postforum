import { uploadComment, deleteComment } from "@/lib/comment";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    return res.status(200).json(await uploadComment(data));
  } else if (req.method == "DELETE") {
    const delete_data = req.body;
    const delete_res = await deleteComment(delete_data);
    res.status(200).json({ success: delete_res });
  }
}
