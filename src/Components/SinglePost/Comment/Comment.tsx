import React, { useState } from 'react'
import { useAppSelector } from '../../../hook/hook'
import { commentApi } from '../../../API/api'
import style from './Comment.module.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
type Props = {
   id: number
   body: string
   author: string
   created: string
   getSinglePost: Function
   image: string
}


const Comment = ({ body, author, created, id, getSinglePost, image }: Props) => {



   const [edit, setEdit] = useState(false)
   const [commentBody, setCommentBody] = useState(body)
   const deletePost = (id: number) => {
      if (window.confirm('delete comment?')) {
         commentApi.deleteComment(id).then(
            () => {
               getSinglePost()
            }
         )
      }
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
      <div className={style.comment}>
         <div className={style.comment__info}>
            <div className={style.comment__author}>
               <p>{author}</p>
               <p>{created.slice(0, 10)}</p>
            </div>
            <div className={style.comment__edit}>
               {user === author && <EditOutlined onClick={() => setEdit(true)} />}
               {user === author && <DeleteOutlined onClick={() => deletePost(id)} />}
            </div>

         </div>
         <div className={style.comment__body}>
            {!edit && <p> {body}</p>}
            {edit && <p> <textarea value={commentBody} autoFocus={true} onChange={(e) => { setCommentBody(e.target.value) }} onBlur={() => editPost(id)} /> </p>}
         </div>
         <p>{image && <img src={image} alt="" />}</p>
      </div>
   )
}

export default Comment