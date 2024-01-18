import Link from "next/link";

export default function NewComment(props) {
  return (
    <div
      className="flex flex-col m-auto w-[95%] h-28 border-2 border-light-gray bg-gray my-10 p-2 has-[:focus]:border-white"
      id="new-comment"
    >
      <textarea
        className="h-full resize-none bg-gray p-2 outline-none"
        placeholder={
          props.logged ? "Your Comment" : "Log in to be able to comment"
        }
        ref={props.CommentContentRef}
      />
      <div className="flex justify-end">
        {props.logged ? (
          <button
            className="border-2 border-light-gray px-5 rounded-lg hover:bg-light-gray"
            onClick={props.UploadComment}
          >
            Comment
          </button>
        ) : (
          <div>
            <Link
              className="border-2 border-light-gray px-5 rounded-lg hover:bg-light-gray mr-2"
              href={"/signup"}
            >
              Signup
            </Link>
            <Link
              className="border-2 border-light-gray px-5 rounded-lg hover:bg-light-gray"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
