import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { instanse, userApi } from '../../../API/api';
import { isExpired, decodeToken } from "react-jwt";
import { useAppDispatch } from '../../../hook/hook';
import { setUser } from '../../../Redux/UserSlice/UserSlice';
import FormEmail from '../FormFields/FormEmail';
import FormPassword from '../FormFields/FormPassword';


type Props = {}

const Login = (props: Props) => {
   let dispatch = useAppDispatch()
   let [complete, setComplete] = useState(false)


   const methods = useForm();
   const { handleSubmit } = methods;

   const onSubmit = (data: any) => {
      userApi.login(data.email, data.password)
         .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            instanse.defaults.headers['Authorization'] =
               'JWT ' + localStorage.getItem('access_token');
            let myDecodedToken: any = decodeToken(res.data.access);
            setComplete(true)
            dispatch(setUser({
               autorise: true,
               name: myDecodedToken.name,
               id: myDecodedToken.user_id,
               error: null,
            }))
         })
   }
   if (complete) { return <Navigate to="/" /> }

   return (
      <div>
         <h1>Login page</h1>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormEmail />
               <FormPassword />
               <button>Войти</button>
            </form>
         </FormProvider>
      </div>
   )
}



export default Login