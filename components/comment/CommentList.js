import { useState } from "react"
import Comment from "./Comment"

export default function CommentsList(props) {
  return (
    <div className="flex flex-col gap-[2%] md:justify-start">
      {props.comments.map((comment) => {
        return (
          <Comment
            author_id={comment.author_id}
            author={comment.author}
            content={comment.content}
            likes={comment.likes}
            id={comment._id}
            key={comment._id}
            post_id={props.post_id}
            comments={props.comments}
            setComments={props.setComments}
          />
        )
      })}
    </div>
  )
}
