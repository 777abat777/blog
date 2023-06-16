import React from 'react'
import { PostType } from '../../../Redux/PostSlice/TypesPostSlice'
import Post from '../../Post/Post'
import style from './New.module.scss'

type Props = {
   posts: Array<PostType>
}

const New = (props: Props) => {
   return (
      <div className={style.new}>
         <h1>New</h1>
         <div className={style.post__container}>
            {props.posts ? props.posts.map((post) => {
               return (
                  <Post title={post.title} key={post.id} id={post.id} slug={post.slug} category={post.category} excerpt={post.excerpt} />)
            })
               : <h1>loading</h1>}
         </div>
      </div>
   )
}

export default New