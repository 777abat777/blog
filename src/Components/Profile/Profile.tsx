import React, { useEffect, useState } from 'react'
import ProfileNavigation from './ProfileNavigation/ProfileNavigation'
import ProfileContent from './ProfileContent/ProfileContent'
import ProfileInfo from './ProfileContent/ProfileInfo/ProfileInfo'
import { profileApi } from '../../API/api'
import { useAppSelector } from '../../hook/hook'
import { PostType } from '../../Types/PostTypes'

type Props = {}

export type profileDataType = {
   about: string,
   blog_posts: Array<PostType> | null
   comments: Array<any> | null
   id: number
   user_name: string
}
let initialState: profileDataType = {
   about: '',
   blog_posts: [],
   comments: [],
   id: 0,
   user_name: ''
}

const Profile = (props: Props) => {
   const [profileData, setProfileData] = useState(initialState)
   const username = useAppSelector((state) => state.userReducer.name)
   useEffect(() => {
      getUserData(username)
   }, [username])

   const getUserData = (username: string) => {
      profileApi.getUser(username).then(
         (res: any) => {
            setProfileData(res.data)
         }
      )
   }

   return (
      <div>
         <ProfileNavigation />
         <ProfileInfo user_name={profileData.user_name} />
         <ProfileContent profileData={profileData} getUserData={getUserData} />
      </div>
   )
}

export default Profile