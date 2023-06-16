import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userType {
   autorise: boolean,
   name: string,
   id: number | string
   error: string | null | undefined,
}


const initialState: userType = {
   autorise: false,
   name: "",
   id: 0,
   error: null,
}

export const UserSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<userType>) => {
         state.name = action.payload.name
         state.autorise = true
         state.id = action.payload.id
      },
      logOutUser: (state, action) => {
         state.name = ""
         state.autorise = false
         state.id = 0
      }
   }
})

export const { setUser, logOutUser } = UserSlice.actions
export default UserSlice.reducer