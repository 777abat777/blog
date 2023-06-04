import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { fetchPosts } from '../../Redux/PostSlice/postsSlice';
import { postApi } from '../../API/api';
const Content = () => {

   let dispatch = useAppDispatch()
   let posts = useAppSelector(state => state.postReducer.posts)

   useEffect(() => {
      // component mount
      dispatch(fetchPosts())
      return () => {
         // Anything in here is fired on component unmount.
      }
   }, [dispatch])


   return (
      <div>
         {posts ? posts.map((post) => <h1>{post.title}</h1>) : <h1>loading</h1>}
         <button onClick={() => postApi.login("admin@mail.ru", "admin")}>login</button>
         <button onClick={() => postApi.logout()}>logout</button>
      </div>
   )
}

export default Content