import React from 'react'
import { useAppSelector } from '../../../../hook/hook'

type Props = {

}

const ProfileInfo = (props: Props) => {
   const userName = useAppSelector(state => state.profileReducer.user_name)
   return (
      <div>{userName}</div>
   )
}

export default ProfileInfo