import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileComments from './ProfileComments/ProfileComments'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { profileDataType } from './../Profile'

type Props = {
   profileData: profileDataType,
   getUserData: Function
}

const ProfileContent = ({ profileData, getUserData }: Props) => {
   return (
      <div>
         <Routes>
            <Route path='posts' element={<ProfilePosts profileData={profileData} getUserData={getUserData} />} />
            <Route path='/' element={<ProfilePosts profileData={profileData} getUserData={getUserData} />} />
            <Route path='comments' element={<ProfileComments />} />
            <Route path='settings' element={<ProfileSettings />} />
         </Routes>
      </div>
   )
}

export default ProfileContent