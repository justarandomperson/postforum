import { Fragment, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SinglePost from "@/components/post/SinglePost";
import CommentsList from "@/components/comment/CommentList";
import NewComment from "@/components/comment/NewComment";

import { loadPost } from "@/lib/post";
import { isLiked } from "@/lib/user";

export default function PostPage(props) {
  const router = useRouter();
  const session = props.session;
  const [likes, setLikes] = useState(props.likes);
  const [comments, setComments] = useState(props.comments);
  const [liked, setLiked] = useState(props.liked);
  const [disabled, setDisabled] = useState(!session);

  const CommentContentRef = useRef(null);
  const post_id = props.post_id;

  const UploadComment = async () => {
    if (!session) {
      return;
    }
    const content = CommentContentRef.current.value;
    const author = session.user.name;
    const user_id = session.user.id;
    const author_id = user_id;

    CommentContentRef.current.value = "";
    const new_comment_data = { author, author_id, content, post_id };
    const new_comments = [...comments];
    new_comments.push({
      ...new_comment_data,
      likes: 0,
      _id: new_comments.length,
    });
    const res = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify(new_comment_data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setComments(new_comments);
  };

  const likePost = async () => {
    if (!session || disabled) {
      return;
    }

    const user_id = session.user.id;

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

  const deletePost = async () => {
    if (!session) {
      return;
    }

    const user_id = session.user.id;
    const res = await fetch(`/api/posts`, {
      method: "DELETE",
      body: JSON.stringify({ user_id, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <Fragment>
      <SinglePost
        liked={liked}
        disabled={disabled}
        title={props.title}
        content={props.content}
        likes={likes}
        creator={props.creator}
        comments={props.comments.length}
        likePost={likePost}
        deletePost={deletePost}
      ></SinglePost>

      <NewComment
        logged={session}
        CommentContentRef={CommentContentRef}
        UploadComment={UploadComment}
      />
      <h1 className="text-3xl text-center my-3">Comments</h1>
      <CommentsList
        comments={comments}
        post_id={post_id}
        setComments={setComments}
      />
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const post_id = params.postId;
  const post = JSON.parse(await loadPost(post_id));
  const session = await getSession(ctx);

  if (!post) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const liked = session ? await isLiked(post_id, session.user.id) : false;

  const creator = session && session.user.id == post.author_id;
  return {
    props: {
      ...post,
      session,
      creator,
      post_id,
      liked,
    },
  };
}
