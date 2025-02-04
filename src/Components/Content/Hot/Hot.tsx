import React from 'react'
import { PostType } from '../../../Types/PostTypes'
import Post from '../../Post/Post'
import style from './Hot.module.scss'
import { useAppSelector } from '../../../hook/hook'

type Props = {
    posts: Array<PostType>
}


const Hot = (props: Props) => {
    let loading = useAppSelector((state) => state.postReducer.loading)
    if (loading) return (
        <h2>loading...</h2>
    )
    return (
        <div className={style.new}>
            <h2>Hot</h2>
            <div className={style.post__container}>
                {props.posts?.map((post) => {
                    return (
                        <Post image={post.image} title={post.title} key={post.id} id={post.id} slug={post.slug} category={post.category} excerpt={post.excerpt} />)
                })}
            </div>
        </div>
    )
}

export default Hot