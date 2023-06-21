import React, { useState } from 'react'
import { commentApi } from '../../../../API/api'
import { useAppSelector } from '../../../../hook/hook'

type Props = {
   postId: number
   getPost: Function
}

const AddComment = (props: Props) => {
   let user = useAppSelector((state) => state.userReducer)
   let [commentValue, setCommentValue] = useState('')

   const addNewComment = () => {
      commentApi.addComment(props.postId, commentValue, user.id).then(
         (res) => {
            props.getPost()
            setCommentValue('')
         }
      )


   }

   return (
      <div>
         <h1>add Comment</h1>
         <textarea onChange={(e) => setCommentValue(e.target.value)} name="" id="" value={commentValue}></textarea>
         <h2>{commentValue}</h2>
         <button onClick={addNewComment}>add comment</button>
      </div>
   )
}

export default AddComment