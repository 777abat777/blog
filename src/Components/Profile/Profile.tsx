import React, { useEffect, useState } from 'react'
import ProfileNavigation from './ProfileNavigation/ProfileNavigation'
import ProfileContent from './ProfileContent/ProfileContent'
import ProfileInfo from './ProfileContent/ProfileInfo/ProfileInfo'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { fetchProfileData } from '../../Redux/ProfileSlice/ProfileSlice'

type Props = {}


const Profile = (props: Props) => {
   const username = useAppSelector((state) => state.userReducer.name)
   let dispatch = useAppDispatch()
   useEffect(() => {
      dispatch(fetchProfileData(username))
   }, [username])


   return (
      <div>
         <ProfileNavigation />
         <ProfileInfo />
         <ProfileContent />
      </div>
   )
}

export default Profile