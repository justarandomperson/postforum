import { useRef, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreatePost from "@/components/post/CreatePost";

export default function CreatePostPage() {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const session = useSession() || null;

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const Upload = async () => {
    const author = session.data.user.name;
    const author_id = session.data.user.id;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    setLoading(true);
    const res = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ author, author_id, title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!data.error) {
      router.push(`/posts/${data._id}`);
    } else {
      setError(data.error);
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <CreatePost
        onSubmit={Upload}
        titleRef={titleRef}
        contentRef={contentRef}
        Loading={Loading}
        error={error}
      />
    </Fragment>
  );
}
