import React from 'react'
import { profileDataType } from '../../Profile'
import ProfilePost from '../ProfileInfo/ProfilePost/ProfilePost'

type Props = {
   profileData: profileDataType
   getUserData: Function
}

const ProfilePosts = ({ profileData, getUserData }: Props) => {
   return (
      <div>
         <div>Panel</div>
         {profileData.blog_posts?.map((post) => <ProfilePost getUserData={getUserData} category={post.category} slug={post.slug} title={post.title} key={post.id} status={post.status} />)}
      </div>
   )
}

export default ProfilePosts