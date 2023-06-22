import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postApi } from '../../API/api'
import style from './SinglePost.module.scss'
import Comment from './Comment/Comment'
import AddComment from './Comment/AddComment/AddComment'

type Props = {}
type postDataType = {
   author: number
   category: "new" | "best" | "hot"
   content: string
   excerpt: string
   id: number
   slug: string
   status: "published" | "draft"
   title: string
   comments: [any]
}

const SinglePost = (props: Props) => {

   const { slug } = useParams()
   const [postData, setPostData] = useState<postDataType>()
   console.log(postData)
   useEffect(() => {
      getSinglePost()
   }, [])
   const getSinglePost = () => {
      postApi.getPost(slug).then((res: any) => {
         setPostData(res.data)
      })
   }
   return (
      <div >
         {postData ? <div className={style.singlePost}>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
            {postData.comments?.map((comment) => <Comment image={comment.image} getSinglePost={getSinglePost} body={comment.body} id={comment.id} key={comment.id} created={comment.created} author={comment.author} />)}
            <AddComment postId={postData.id} getPost={getSinglePost} />
         </div>
            : <h1>no data</h1>}

      </div>
   )
}

export default SinglePost