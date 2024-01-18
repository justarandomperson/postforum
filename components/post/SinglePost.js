import { Heart, LoadingCircle, Trash, Comment } from "../icons";

export default function SinglePost(props) {
  return (
    <div>
      <div className="flex flex-col justify-between w-[95%] h-2/5 md:h-4/6 m-auto border-[.5px] border-transparent bg-gray min-h-36 overflow-hidden">
        <div className="flex flex-col bg-nice-gray rounded h-full w-full">
          <div className="flex justify-center">
            <h1 className="w-full py-4 text-center break-word text-3xl overflow-hidden">
              {props.title || "Loading"}
            </h1>
            {props.creator && (
              <div className="flex justify-end border-0 items-center pr-2">
                <div onClick={props.deletePost}>
                  <Trash />
                </div>
              </div>
            )}
          </div>
          <hr />
          <h3 className="px-5 py-3 text-xl h-full break-words">
            {props.content || (
              <div className="flex justify-center items-center h-full">
                <LoadingCircle />
              </div>
            )}
          </h3>
        </div>
      </div>
      <div className="flex justify-end bg-gray w-[95%] pb-2 px-2 m-auto gap-2">
        <span className="flex gap-1">
          {props.likes}
          <button onClick={props.likePost} disabled={props.disabled}>
            <Heart liked={props.liked} disabled={props.disabled} />
          </button>
        </span>
        <span className="flex gap-1">
          {props.comments}
          <Comment />
        </span>
      </div>
    </div>
  );
}
