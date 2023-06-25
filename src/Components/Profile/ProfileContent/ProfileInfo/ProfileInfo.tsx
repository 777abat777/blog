import React from 'react'

type Props = {
   user_name: string | undefined
}

const ProfileInfo = ({ user_name }: Props) => {
   return (
      <div>{user_name}</div>
   )
}

export default ProfileInfo