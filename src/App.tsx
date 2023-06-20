
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Registration';
import LogOut from './Components/User/LogOut/LogOut';
import Profile from './Components/Profile/Profile';
import AddPost from './Components/AddPost/AddPost';
import { useAppDispatch, useAppSelector } from './hook/hook';
import { useEffect } from 'react';
import { instanse } from './API/api';
import { decodeToken } from 'react-jwt';
import { setUser } from './Redux/UserSlice/UserSlice';



function App() {
   let userAutorise = useAppSelector(state => state.userReducer.autorise)
   let dispatch = useAppDispatch()
   useEffect(() => {
      if (!userAutorise) {
         if (localStorage.length > 1) {
            let access: any = localStorage.getItem('access_token')
            instanse.defaults.headers['Authorization'] =
               'JWT ' + localStorage.getItem('access_token');
            let myDecodedToken: any = decodeToken(access);
            dispatch(setUser({
               autorise: true,
               name: myDecodedToken.name,
               id: myDecodedToken.user_id,
               error: null,
            }))
         }
      }
   }, [])
   return (
      <div className="App">
         <Header />
         <div className="content">
            <div className='container'>
               <Routes>
                  <Route path='/*' element={<Content />} />
                  <Route path='login' element={<Login />} />
                  <Route path='registration' element={<Register />} />
                  <Route path='logout' element={<LogOut />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='addpost' element={<AddPost />} />
               </Routes>
            </div>

            <SideBar />
         </div>
      </div>
   );
}

export default App;
