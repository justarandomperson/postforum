import Link from "next/link"
import { Fragment } from "react"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data } = useSession()
  return (
    <div className="flex bg-gray border-light-gray sticky top-0 border-b-[1px] h-12 justify-between items-center px-5 w-full ">
      <h1 className="text-2xl font-bold md:text-3xl">
        <Link href={"/"}>PostForum</Link>
      </h1>
      <nav className="flex gap-5 text-sm md:text-xl">
        <Link href={"/"}>Posts</Link>
        {data ? (
          <Fragment>
            <Link href={"/create-post"}>New Post</Link>
            <Link href={"/profile"}>Profile</Link>
            <button onClick={() => signOut()}>Logout</button>
          </Fragment>
        ) : (
          <Fragment>
            <Link href={"/signup"}>Signup</Link>
            <Link href={"/login"}>Login</Link>
          </Fragment>
        )}
      </nav>
    </div>
  )
}
