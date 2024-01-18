import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileBanner from "@/components/user/Profile";
import PostsList from "@/components/post/PostsList";

export default function ProfilePage(props) {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();
  const session = useSession();
  if (!session) {
    router.push("/");
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/users/${session.data.user.id}`, {
        next: { revalidate: 30 },
      });
      const new_data = await res.json();
      setData(new_data);
      setLoading(false);
    };

    if (session.data) {
      loadData();
    }
  });

  if (Loading) {
    return <ProfileBanner Loading={true} />;
  }
  return (
    <Fragment>
      <ProfileBanner
        username={session.data.user.name}
        likes={data.likes}
        posts={data.posts.length}
      />
      <h1 className="my-5 text-center text-3xl font-bold">Posts</h1>
      <PostsList posts={data.posts} />
    </Fragment>
  );
}
