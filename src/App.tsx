
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Register';
import LogOut from './Components/User/LogOut/LogOut';

function App() {
   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path='' element={<Content />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='logout' element={<LogOut />} />
         </Routes>
         <SideBar />
      </div>
   );
}

export default App;
