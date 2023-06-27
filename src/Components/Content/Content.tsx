import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { fetchPosts } from '../../Redux/PostSlice/postsSlice';
import { NavLink, Route, Routes } from 'react-router-dom';
import Post from '../Post/Post';
import New from './New/New';
import Hot from './Hot/Hot';
import Best from './Best/Best';
import SinglePost from '../SinglePost/SinglePost';
const Content = () => {

   let dispatch = useAppDispatch()
   let posts = useAppSelector(state => state.postReducer.posts)
   const postsNew = posts?.filter((post) => post.category === "new")

   useEffect(() => {
      dispatch(fetchPosts())

   }, [dispatch])


   return (
      <div>
         <Routes>
            <Route path='/*' element={<New posts={postsNew} />} />
            <Route path='/new' element={<New posts={postsNew} />} />
            <Route path='/new/:slug' element={<SinglePost />} />
            <Route path='/hot' element={<Hot />} />
            <Route path='/best' element={<Best />} />
         </Routes>
      </div>
   )
}

export default Content