import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hook/hook'
import style from './Header.module.scss'
const Header = () => {
   let user = useAppSelector(state => state.userReducer)
   return (

      <div className={style.header}>
         <div className={style.header__logo}>
            <NavLink to='/'>
               <FontAwesomeIcon icon={faBlog} size="2x" />
               <p>Blog</p>
            </NavLink>
         </div>
         <div className={style.header__category}>
            <NavLink to='new'>New</NavLink>
            <NavLink to='hot'>Hot</NavLink>
            <NavLink to='best'>Best</NavLink>
         </div>
         <div className={style.header__profile}>
            {user.autorise ? <NavLink to='profile'>{user.name}</NavLink> : <NavLink to='login'>Login</NavLink>}
            {user.autorise && <NavLink to='logout'>Logout</NavLink>}
            {!user.autorise && <NavLink to='registration'>Sign up</NavLink>}
         </div>



      </div>
   )
}

export default Header