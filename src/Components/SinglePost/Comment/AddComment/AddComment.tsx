import React, { useState } from 'react'
import { commentApi } from '../../../../API/api'

type Props = {
   postId: number
   getPost: Function
}

const AddComment = (props: Props) => {
   let [commentValue, setCommentValue] = useState('')

   const addNewComment = () => {
      commentApi.addComment(props.postId, commentValue).then(
         (res) => {
            props.getPost()
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