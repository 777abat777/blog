import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postApi } from '../../API/api'
import style from './SinglePost.module.scss'

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
}

const SinglePost = (props: Props) => {
   const { slug } = useParams()
   const [postData, setPostData] = useState<postDataType>()
   useEffect(() => {
      postApi.getPost(slug).then((res: any) => {
         console.log(res)
         setPostData(res.data)
         console.log(postData)
      })
   }, [setPostData])
   return (
      <div >
         {postData ? <div className={style.singlePost}>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
         </div>
            : <h1>no data</h1>}

      </div>
   )
}

export default SinglePost