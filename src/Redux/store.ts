import { configureStore } from '@reduxjs/toolkit'
import PostsSlice from "./PostSlice/postsSlice"
import UserSlice from './UserSlice/UserSlice'
export const store = configureStore({
   reducer: {
      postReducer: PostsSlice,
      userReducer: UserSlice
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

