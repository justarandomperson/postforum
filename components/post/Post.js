import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { Heart, Comment } from "../icons";

export default function Post(props) {
  const session = useSession();
  const date = new Date(props.createdAt).toDateString();
  const [disabled, setDisabled] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const post_id = props.id;

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/users/${session.data.user.id}/${post_id}`);
      const data = await res.json();

      setLiked(data.liked);
      setDisabled(false);
    };

    if (session.data) {
      load();
    }
  });

  const likePost = async () => {
    console.log(disabled);
    if (!session || disabled) {
      return;
    }

    const user_id = session.data.user.id;

    setLiked(!liked);
    setDisabled(true);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);

    const res = await fetch(`/api/like-post`, {
      method: "POST",
      body: JSON.stringify({ post_id, user_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setLiked(!liked);
      liked ? setLikes(likes - 1) : setLikes(likes + 1);
    }

    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-between w-full md:w-[49%] xl:w-[23%] h-60 border-[.5px] border-transparent bg-gray hover:bg-light-gray">
      <Link
        href={`/posts/${props.id}`}
        className="flex flex-col bg-nice-gray rounded h-full w-full"
      >
        <h1 className="py-4 text-center break-words text-xl overflow-hidden lg:text-3xl">
          {(props.title.length > 75 && props.title.substring(0, 75) + "...") ||
            props.title}
        </h1>
        <hr />
        <h3 className="p-5 text-md break-words lg:text-xl">
          {(props.content.length > 100 &&
            props.content.substring(0, 100) + "...") ||
            props.content}
        </h3>
      </Link>
      <div className="flex justify-between px-2 pb-2">
        <div className="text-sm ">
          <p>
            Posted by: {props.author} {date}
          </p>
        </div>
        <Link
          href={`/posts/${props.id}`}
          className="hidden md:flex-grow md:inline"
        ></Link>
        <div className="flex justify-end">
          <span className="flex items-center gap-1">
            {likes}
            <button onClick={likePost}>
              <Heart liked={liked} disabled={disabled} />
            </button>
          </span>

          <Link
            href={`/posts/${props.id}#new-comment`}
            className="flex items-center gap-1 group px-2 border-2 border-white border-opacity-0 hover:border-opacity-50"
          >
            {props.comments.length}
            <Comment />
          </Link>
        </div>
      </div>
    </div>
  );
}
