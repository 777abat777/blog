import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { fetchPosts } from '../../Redux/PostSlice/postsSlice';
import { Route, Routes } from 'react-router-dom';
import New from './New/New';
import Hot from './Hot/Hot';
import Best from './Best/Best';
import SinglePost from '../SinglePost/SinglePost';
const Content = () => {

    let dispatch = useAppDispatch()
    let posts = useAppSelector(state => state.postReducer.posts)
    const postsNew = posts?.filter((post) => post.category === "new" && post.status !== "draft")
    const postsHot = posts?.filter((post) => post.category === "hot" && post.status !== "draft")
    const postsBest = posts?.filter((post) => post.category === "best" && post.status !== "draft")
    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])


    return (
        <div>
            <Routes>
                <Route path='/*' element={<New posts={postsNew} />} />
                <Route path='/new' element={<New posts={postsNew} />} />
                <Route path='/new/:slug' element={<SinglePost />} />
                <Route path='/hot' element={<Hot posts={postsHot} />} />
                <Route path='/hot/:slug' element={<SinglePost />} />
                <Route path='/best' element={<Best posts={postsBest} />} />
                <Route path='/best/:slug' element={<SinglePost />} />
            </Routes>
        </div>
    )
}

export default Content