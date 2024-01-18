import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadingCircle } from "@/components/icons";

import PostsList from "@/components/post/PostsList";

import SinglePost from "@/components/post/SinglePost";

import { loadPosts } from "@/lib/post";

export default function PostsPage(props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState(props.posts);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url.includes("posts")) {
        setLoading(true);
        window.scrollTo(0, 0);
      }
    };

    const handleRouteComplete = (url) => {
      setLoading(false);
    };

    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = JSON.parse(await res.json());
      setPosts(data);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    fetchPosts();
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  if (isLoading) {
    return <SinglePost />;
  }

  return <PostsList posts={posts} />;
}

export const getStaticProps = async () => {
  const posts = JSON.parse(await loadPosts());
  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  };
};
