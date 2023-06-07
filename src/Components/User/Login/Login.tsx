import React from 'react'
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { instanse, userApi } from '../../../API/api';
import { isExpired, decodeToken } from "react-jwt";
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { setUser } from '../../../Redux/UserSlice/UserSlice';


type Props = {}

const Login = (props: Props) => {

   let dispatch = useAppDispatch()
   let user = useAppSelector(state => state.userReducer)


   let [complete, setComplete] = useState(false)
   const { register,
      handleSubmit,
      formState: { errors },
      setError,
      reset,
      resetField,
      clearErrors
   } = useForm({ mode: "onChange" });

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
         <form onSubmit={handleSubmit(onSubmit)}>
            <LoginEmail register={register} errors={errors} />
            <LoginPassword register={register} errors={errors} />
            <button onClick={() => clearErrors(["server", "password"])}>Войти</button>
         </form>
      </div>
   )
}

const LoginEmail = ({ register, errors }: any) => {
   return (
      <div>
         <p> <label htmlFor="email">Email:</label>
            <input placeholder="Email" id="email" type="text" {...register('email', {
               required: true,
               pattern: {
                  value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
               }
            })} aria-invalid={errors.email ? "true" : "false"} /></p>
         {errors.email?.type === 'required' && <p >email is required</p>}
         {errors.email?.type === 'pattern' && <p >enter correct email</p>}
      </div>
   )
}
const LoginPassword = ({ register, errors, }: any) => {
   return (
      <div>
         <p><label htmlFor="password">Password:</label>
            <input placeholder="password" id="password" type="password"  {...register('password', { required: true, minLength: 4 })} aria-invalid={errors.name ? "true" : "false"} /></p>
         {errors.password?.type === 'required' && <p >password is required</p>}
         {errors.password?.type === 'minLength' && <p >minLength 8</p>}
         <p>
         </p>
      </div>
   )
}


export default Login