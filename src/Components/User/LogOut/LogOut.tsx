import React, { useEffect, useState } from 'react'
import { userApi } from '../../../API/api'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hook/hook'
import { logOutUser } from '../../../Redux/UserSlice/UserSlice'

type Props = {}

const LogOut = (props: Props) => {
   let [logout, setLogOut] = useState(false)
   let dispatch = useAppDispatch()
   useEffect(() => {
      userApi.logout().then(
         () => {
            setLogOut(true)
            dispatch(logOutUser(''))
         }
      )
   }, [])
   if (logout) { return <Navigate to="/login" /> }
   return (
      <div>LogOut</div>
   )
}

export default LogOut