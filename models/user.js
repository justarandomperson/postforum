import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
