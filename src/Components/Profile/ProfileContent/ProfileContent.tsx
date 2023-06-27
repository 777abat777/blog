import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import ProfileComments from './ProfileComments/ProfileComments'
import ProfileSettings from './ProfileSettings/ProfileSettings'

type Props = {
}

const ProfileContent = (props: Props) => {
   return (
      <div>
         <Routes>
            <Route path='posts' element={<ProfilePosts />} />
            <Route path='/' element={<ProfilePosts />} />
            <Route path='comments' element={<ProfileComments />} />
            <Route path='settings' element={<ProfileSettings />} />
         </Routes>
      </div>
   )
}

export default ProfileContent