import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './header.css'
import { useAppSelector } from '../../hook/hook'

const Header = () => {
   let user = useAppSelector(state => state.userReducer)
   return (

      <div className='header'>
         <div className='header__logo'>
            <NavLink to='/'>
               <FontAwesomeIcon icon={faBlog} size="3x" />
               Blog
            </NavLink>
         </div>
         <div className="header__category">
            <NavLink to=''>Hot</NavLink>
            <NavLink to=''>Best</NavLink>
            <NavLink to=''>New</NavLink>
         </div>
         <div className="header__profile">
            {user.autorise ? <NavLink to='profile'>{user.name}</NavLink> : <NavLink to='login'>Login</NavLink>}

            <NavLink to='logout'>Logout</NavLink>
            {!user.autorise && <NavLink to='register'>register</NavLink>}
         </div>



      </div>
   )
}

export default Header