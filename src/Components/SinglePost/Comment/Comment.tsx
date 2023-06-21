import React, { useState } from 'react'
import { useAppSelector } from '../../../hook/hook'
import { commentApi } from '../../../API/api'

type Props = {
   id: number
   body: string
   author: string
   created: string
   getSinglePost: Function
}


const Comment = ({ body, author, created, id, getSinglePost }: Props) => {
   const [edit, setEdit] = useState(false)
   const [commentBody, setCommentBody] = useState(body)
   const deletePost = (id: number) => {
      commentApi.deleteComment(id).then(
         () => {
            getSinglePost()
         }
      )
   }
   const editPost = (id: number) => {
      if (commentBody !== body) {
         commentApi.editComment(id, commentBody).then(
            () => {
               getSinglePost()
            }
         )
      }
      setEdit(false)
   }


   let user = useAppSelector((state) => state.userReducer.name)
   return (
      <div>
         <p>{author} {created.slice(0, 10)}</p>
         <div>
            {!edit && <p> {body}</p>}
            {edit && <p> <input type="text" value={commentBody} autoFocus={true} onChange={(e) => { setCommentBody(e.target.value) }} onBlur={() => editPost(id)} /> </p>}
         </div>
         <p>{user === author && <button onClick={() => deletePost(id)}>delete</button>}</p>
         <p>{user === author && <button onClick={() => setEdit(true)}>edit</button>}</p>
      </div>
   )
}

export default Comment