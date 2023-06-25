import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './ProfileNavigation.module.scss'

type Props = {}

const ProfileNavigation = (props: Props) => {
   return (
      <div className={style.profileNavigation}>
         <NavLink to='/profile/comments'>Комментарии</NavLink>
         <NavLink to='/profile/posts'>Посты</NavLink>
         <NavLink to='/profile/settings'>настройки</NavLink>
      </div>
   )
}

export default ProfileNavigation