import React from 'react'
import style from './SideBar.module.scss'
import { useAppSelector } from '../../hook/hook'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
   let autorise = useAppSelector(state => state.userReducer.autorise)
   return (
      <div className={style.sideBar}>
         {autorise && <NavLink to='addpost'>addpost</NavLink>}
      </div>
   )
}

export default SideBar