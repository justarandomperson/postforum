import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    const data = req.body;

    const { username, password } = data;

    if (!username || !password) {
      return res.status(422).json({ message: "Invalid input." });
    }

    if (await User.findOne({ username: username })) {
      return res
        .status(422)
        .json({ message: "An account with that username already exists" });
    }

    const hashedPassword = await hash(password, 12);

    connectMongoDB();

    const result = await User.create({
      username: username,
      password: hashedPassword,
      likedPosts: [],
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error. Please try again later" });
  }
}
