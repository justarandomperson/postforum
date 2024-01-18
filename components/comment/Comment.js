import { Trash } from "../icons"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Comment(props) {
  const [creator, setCreator] = useState(false)
  const session = useSession()

  const deleteComment = async () => {
    const user_id = session.data.user.id
    const comment_id = props.id
    const new_comments = props.comments.filter((comment) => {
      return comment._id != comment_id
    })

    console.log(new_comments)

    props.setComments(new_comments)
    const res = await fetch(`/api/comments`, {
      method: "DELETE",
      body: JSON.stringify({ user_id, comment_id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  useEffect(() => {
    if (session.data) {
      setCreator(props.author_id == session.data.user.id)
    }
  })
  return (
    <div className="flex flex-col m-auto justify-between w-[95%] border-2 border-light-gray bg-gray mb-5">
      <div className="flex flex-col bg-nice-gray rounded h-full w-full">
        <h1 className="text-xl p-2 break-word text-left font-bold">
          {props.author}
        </h1>
        <div className="flex justify-between p-2">
          <h3 className="px-2">{props.content}</h3>
          {creator && (
            <span className="flex gap-1">
              <button onClick={deleteComment}>
                <Trash />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
