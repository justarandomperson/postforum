import { SmallLoadingCircle } from "../icons";

export default function CreatePost(props) {
  return (
    <div className="flex justify-center h-full w-full">
      <div className="flex flex-col justify-between w-full h-1/2 bg-gray rounded p-5 2xl:w-2/3 pb-2 xl:mb-0 xl:mt-10 md:h-80">
        <div>
          <h1
            className={`text-xl mb-2 font-bold text-center ${
              props.error ? "border-2" : "border-transparent"
            } border-red-500 p-2`}
          >
            {props.error}
          </h1>
          <h1 className="text-2xl mb-2 font-bold">Title</h1>
          <input
            ref={props.titleRef}
            className=" border-[1px] rounded focus:outline-none border-light-gray focus:border-white bg-gray w-full h-1/6 mb-5 p-2"
          ></input>

          <h1 className="text-2xl mb-2 font-bold">Content</h1>
          <textarea
            ref={props.contentRef}
            className="border-[1px] rounded focus:outline-none border-light-gray focus:border-white bg-gray w-full h-16 resize-none p-2"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            className="rounded border-2 w-20 text-xl border-light-gray hover:bg-gray-500 hover:bg-light-gray"
            onClick={props.onSubmit}
            disabled={props.Loading}
          >
            {(props.Loading && <SmallLoadingCircle />) || "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
