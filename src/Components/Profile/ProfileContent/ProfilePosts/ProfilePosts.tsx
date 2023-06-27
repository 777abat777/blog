import React from 'react'
import ProfilePost from '../ProfileInfo/ProfilePost/ProfilePost'
import { useAppSelector } from '../../../../hook/hook'

type Props = {
}

const ProfilePosts = (props: Props) => {
   let profilePosts = useAppSelector(state => state.profileReducer.blog_posts)
   return (
      <div>
         <div>Panel</div>
         {profilePosts?.map((post) => <ProfilePost content={post.content} published={post.published} category={post.category} slug={post.slug} title={post.title} key={post.id} status={post.status} id={post.id} />)}
      </div>
   )
}

export default ProfilePosts