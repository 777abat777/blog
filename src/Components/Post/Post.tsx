import React from 'react'
import { postApi } from '../../API/api'
import { useAppDispatch } from '../../hook/hook'
import { fetchPosts } from '../../Redux/PostSlice/postsSlice'
import { NavLink } from 'react-router-dom'
import style from './Post.module.scss'

type Props = {
   title: string
   id: number
   slug: string
   category: string
   excerpt: string
   image: string
}

const Post = ({ slug, title, excerpt, image }: Props) => {
   let dispatch = useAppDispatch()

   const deletePost = (slug: string) => {
      postApi.deletePost(slug)
         .then((res) => {
            dispatch(fetchPosts())
         })
   }

   return (
      <div className={style.post}>
         <NavLink to={slug}>{title}</NavLink>
         <p>{excerpt}</p>
         <img src={image} alt="" />
         <button onClick={() => { deletePost(slug) }}>delete</button>
      </div>
   )
}

export default Post