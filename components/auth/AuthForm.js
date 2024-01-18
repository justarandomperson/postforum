import { SmallLoadingCircle } from "../icons";

export default function AuthForm(props) {
  return (
    <form className="flex flex-col justify-between w-full h-80 m-auto bg-gray rounded p-5 md:w-2/3 xl:mt-20">
      <div>
        <h1 className="text-2xl mb-2 font-bold">Username</h1>
        <input
          className=" border-[1px] rounded focus:outline-none border-light-gray focus:border-white bg-gray w-full h-8  mb-10 p-2"
          autoComplete="username"
          ref={props.usernameRef}
        ></input>

        <h1 className="text-2xl mb-2 font-bold">Password</h1>
        <input
          type="password"
          className=" border-[1px] rounded focus:outline-none border-light-gray focus:border-white bg-gray w-full h-8 mb-10 p-2"
          autoComplete="current-password"
          ref={props.passwordRef}
        ></input>
      </div>

      <div className="flex justify-end">
        <button
          className="rounded border-2 border-light-gray w-20 text-xl bg-gray text-white hover:bg-light-gray "
          onClick={props.onSubmit}
          disabled={props.Loading}
        >
          {(props.Loading && <SmallLoadingCircle />) ||
            (props.login && "Login") ||
            "Signup"}
        </button>
      </div>
    </form>
  );
}
