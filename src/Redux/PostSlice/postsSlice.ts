import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostType, PostsStateInterface, ResponseData } from '../../Types/PostTypes'
import { postApi } from '../../API/api'


const initialState: PostsStateInterface = {
   posts: [],
   loading: false,
   error: null,
}

export const fetchPosts = createAsyncThunk(
   'posts/fetchPosts',
   async (_, { rejectWithValue, dispatch }) => {
      const response: any = await postApi.getPosts()
      if (response.status !== 200) {
         return rejectWithValue(`Server error ${response.message}`)
      }
      const data: Array<PostType> = await response.data
      dispatch(setPosts(data))

   }
)


export const PostsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setPosts: (state, action) => {
         state.posts = action.payload
      }
   },
   extraReducers(builder) {
      builder
         .addCase(fetchPosts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

         })
         .addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.error
            state.loading = false
            console.log(state.error)
         })
   },
}
)

export const { setPosts } = PostsSlice.actions
export default PostsSlice.reducer