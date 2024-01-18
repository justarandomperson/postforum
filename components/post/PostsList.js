import Post from "./Post";

export default function PostsList(props) {
  return (
    <div className="h-4/5 flex flex-wrap gap-5 justify-start md:gap-[2%]">
      {props.posts.map((post) => {
        return (
          <Post
            title={post.title}
            content={post.content}
            author={post.author}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            id={post._id}
            key={post._id}
            session={props.session}
          />
        );
      })}
    </div>
  );
}
