import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostType, PostsStateInterface, ResponseData } from './TypesPostSlice'
import { postApi } from '../../API/api'
// import { usersApi } from "../../api/api"
// import { ResponseData, TypeFetchUsersArguments, TypeFollowToggleTunkArguments, UsersStateInterface } from './TypesUserSlice'

const initialState: PostsStateInterface = {
   posts: [],
   loading: false,
   error: null,
}

export const fetchPosts = createAsyncThunk(
   'users/fetchUsers',
   async (requestdata, { rejectWithValue }) => {
      const response: any = await postApi.getPosts()
      if (response.status !== 200) {
         return rejectWithValue(`Server error ${response.message}`)
      }
      const data: Array<PostType> = await response.data
      return data
   }
)
// export const followToggleTunk = createAsyncThunk<any, TypeFollowToggleTunkArguments, { rejectValue: string }>(
//    'users/folloToggleTunk',
//    async (requestdata, { rejectWithValue, dispatch }) => {
//       let { id, followCase } = requestdata
//       dispatch(followingUsers(id))
//       if (followCase === "follow") {
//          const response = await usersApi.followRequest(id)
//          if (response.status !== 200) {
//             return rejectWithValue(`Server error ${response.message}`)
//          }
//          const data = await response.data
//          dispatch(follow(id))
//          dispatch(followingSucces(id))
//          return data
//       }
//       if (followCase === "unfollow") {
//          const response = await usersApi.unfollowRequest(id)
//          if (response.status !== 200) {
//             console.log(response)
//             return rejectWithValue(`Server error ${response.message}`)
//          }
//          const data = await response.data
//          dispatch(unFollow(id))
//          dispatch(followingSucces(id))
//          return data
//       }
//    }
// )

export const PostsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      // follow: (state, action: PayloadAction<number>) => {
      //    state.users.map(user => {
      //       if (user.id === action.payload) {
      //          return user.followed = true
      //       }
      //       return user
      //    })
      // },
      // unFollow: (state, action: PayloadAction<number>) => {
      //    state.users.map(user => {
      //       if (user.id === action.payload) {
      //          return user.followed = false
      //       }
      //       return user
      //    })
      // },
      // setUsersTotalCount: (state, action: PayloadAction<number>) => {
      //    state.totalUserCount = action.payload
      // },
      // changePage: (state, action: PayloadAction<number>) => {
      //    state.currentPage = action.payload
      // },
      // resetPage: (state) => {
      //    state.currentPage = 1
      // },
      // followingUsers: (state, action: PayloadAction<number>) => {
      //    state.followingUsers.push(action.payload)
      // },
      // followingSucces: (state, action: PayloadAction<number>) => {
      //    state.followingUsers = state.followingUsers.filter((el) => el !== action.payload)
      // }
   },
   extraReducers(builder) {
      builder
         .addCase(fetchPosts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
         })
      // .addCase(fetchPosts.rejected, (state, action) => {
      //    state.error = action.payload
      //    state.loading = false
      // })
      // .addCase(followToggleTunk.pending, (state) => {
      // })
      // .addCase(followToggleTunk.fulfilled, (state, action) => {

      // })
      // .addCase(followToggleTunk.rejected, (state, action) => {

      // })
   },
}
)

// export const { setUsersTotalCount, changePage, resetPage, follow, unFollow, followingUsers, followingSucces } = PostsSlice.actions
export default PostsSlice.reducer