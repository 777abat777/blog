import React from 'react'
import { PostType } from '../../../Types/PostTypes'
import Post from '../../Post/Post'
import style from './New.module.scss'
import { useAppSelector } from '../../../hook/hook'

type Props = {
   posts: Array<PostType>
}

const New = (props: Props) => {
   let loading = useAppSelector((state) => state.postReducer.loading)
   console.log(props.posts)
   if (loading) return (
      <h1>loading...</h1>
   )
   return (
      <div className={style.new}>
         <h1>New</h1>
         <div className={style.post__container}>
            {props.posts?.map((post) => {
               return (
                  <Post image={post.image} title={post.title} key={post.id} id={post.id} slug={post.slug} category={post.category} excerpt={post.excerpt} />)
            })}
         </div>
      </div>
   )
}

export default New