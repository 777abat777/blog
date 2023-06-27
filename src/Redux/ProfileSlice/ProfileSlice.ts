import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { profileApi } from '../../API/api'
import { profileDataType } from '../../Types/ProfileTypes'


let initialState: profileDataType = {
   about: '',
   blog_posts: [],
   comments: [],
   id: 0,
   user_name: ''
}


export const fetchProfileData = createAsyncThunk(
   'profile/fetchprofiledata',
   async (name: string, { rejectWithValue, dispatch }) => {
      const response: any = await profileApi.getUser(name)
      if (response.status !== 200) {
         return rejectWithValue(`Server error ${response.message}`)
      }
      const data: profileDataType = await response.data
      dispatch(setUser(data))

   }
)

export const ProfileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<profileDataType>) => {
         state.about = action.payload.about
         state.blog_posts = action.payload.blog_posts
         state.comments = action.payload.comments
         state.id = action.payload.id
         state.user_name = action.payload.user_name
      },

   },
   extraReducers(builder) {
      builder
         .addCase(fetchProfileData.pending, (state) => {
         })
         .addCase(fetchProfileData.fulfilled, (state, action) => {

         })
         .addCase(fetchProfileData.rejected, (state, action) => {

         })
   }
})

export const { setUser } = ProfileSlice.actions
export default ProfileSlice.reducer