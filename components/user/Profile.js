import { LoadingCircle } from "../icons";

export default function ProfileBanner(props) {
  return (
    <div className="bg-gray h-30 p-5">
      {props.Loading ? (
        <div className="flex justify-center">
          <LoadingCircle />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">{props.username}</h1>
          <div className="mt-2">
            <h3>likes: {props.likes}</h3>
            <h3>posts: {props.posts}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
