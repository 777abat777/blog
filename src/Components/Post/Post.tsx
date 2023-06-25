import React, { useEffect, useState } from 'react'
import { postApi } from '../../API/api'
import { useAppDispatch } from '../../hook/hook'
import { fetchPosts } from '../../Redux/PostSlice/postsSlice'
import { NavLink } from 'react-router-dom'
import style from './Post.module.scss'
import HeartOutlined from '@ant-design/icons/lib/icons/HeartOutlined'
import HeartFilled from '@ant-design/icons/lib/icons/HeartFilled'
import DislikeOutlined from '@ant-design/icons/lib/icons/DislikeOutlined'
import DislikeFilled from '@ant-design/icons/lib/icons/DislikeFilled'

type Props = {
   title: string
   id: number
   slug: string
   category: string
   excerpt: string
   image: string
}

const Post = ({ slug, title, excerpt, image }: Props) => {
   const [like, setLike] = useState(false)
   const [dislike, setDislike] = useState(false)
   const [likeCount, setLikeCount] = useState(50);
   const [dislikeCount, setDislikeCount] = useState(25);
   const [rating, setRating] = useState(likeCount - dislikeCount)

   const togglelike = () => {
      if (!like) {
         setLike(!like)
         setLikeCount(likeCount + 1)
      } else {
         setLike(!like)
         setLikeCount(likeCount - 1)
      }
   }
   useEffect(() => {
      console.log(likeCount);
      setRating(likeCount - dislikeCount)
   }, [likeCount, dislikeCount]);

   const toggleDislike = () => {
      if (!dislike) {
         setDislike(!dislike)
         setDislikeCount(dislikeCount + 1)
      } else {
         setDislike(!dislike)
         setDislikeCount(dislikeCount - 1)
      }
   }


   let dispatch = useAppDispatch()

   const deletePost = (slug: string) => {
      postApi.deletePost(slug)
         .then((res) => {
            dispatch(fetchPosts())
         })
   }

   return (
      <div className={style.post}>
         <div className={style.post__body}>
            <NavLink to={slug}>{title}</NavLink>
            <p>{excerpt}</p>
            {/* <button onClick={() => { deletePost(slug) }}>delete</button> */}
            <div className={style.post__rating}>
               {!like && <div onClick={toggleDislike}>{!dislike && <DislikeOutlined />}{dislike && <DislikeFilled />}</div>}
               <p>{rating}</p>
               {!dislike && <div onClick={togglelike}>{!like && <HeartOutlined />} {like && <HeartFilled />}</div>}
            </div>
         </div>
         <img src={image} alt="" />
      </div>
   )
}

export default Post