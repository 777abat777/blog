import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { instanse, userApi } from '../../API/api'
import { decodeToken } from 'react-jwt'

export interface userType {
   autorise: boolean,
   name: string,
   id: number
   error: string | null | undefined,
}


const initialState: userType = {
   autorise: false,
   name: "",
   id: 0,
   error: null,
}

export interface requestDataI {
   email: string,
   password: string | number
}

export const userAutorise = createAsyncThunk(
   'user/userAutorise',
   async (requestdata: requestDataI, { rejectWithValue, dispatch }) => {
      let { email, password } = requestdata
      const response: any = await userApi.login(email, password)
      if (response.status !== 200) {
         return rejectWithValue(`Server error ${response.message}`)
      }
      let data = await response.data
      dispatch(setLocalStorage(data))
   }
)

export const UserSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<userType>) => {
         state.name = action.payload.name
         state.autorise = true
         state.id = action.payload.id
      },
      setLocalStorage: (state, action) => {
         localStorage.setItem('access_token', action.payload.access);
         localStorage.setItem('refresh_token', action.payload.refresh);
         instanse.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token');
         let myDecodedToken: any = decodeToken(action.payload.access);
         state.name = myDecodedToken.name
         state.autorise = true
         state.id = myDecodedToken.user_id
      },
      logOutUser: (state, action) => {
         state.name = ""
         state.autorise = false
         state.id = 0
      }
   },
   extraReducers(builder) {
      builder
         .addCase(userAutorise.pending, (state) => {

         })
         .addCase(userAutorise.fulfilled, (state, action) => {

         })
         .addCase(userAutorise.rejected, (state, action) => {

         })
   }
})

export const { setUser, logOutUser, setLocalStorage } = UserSlice.actions
export default UserSlice.reducer