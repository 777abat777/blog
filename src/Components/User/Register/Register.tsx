import React from 'react'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userApi } from '../../../API/api';

type Props = {}


const Register = (props: Props) => {

   let [complete, setComplete] = useState(false)
   const navigate = useNavigate()
   const { register,
      handleSubmit,
      formState: { errors },
      setError,
      reset,
      resetField,
      clearErrors
   } = useForm({ mode: "onChange" });

   const onSubmit = (data: any) => {
      userApi.register(data.email, data.login, data.password)
         .then((res) => {
            setComplete(true)
            console.log(res);
            console.log(res.data);
         });

   }
   if (complete) { return <Navigate to="/" /> }
   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <LoginEmail register={register} errors={errors} />
            <LoginUserName register={register} errors={errors} />
            <LoginPassword register={register} errors={errors} />
            <button onClick={() => clearErrors(["server", "password"])}>Регистрация</button>
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
const LoginUserName = ({ register, errors }: any) => {
   return (
      <div>
         <p> <label htmlFor="login">Login:</label>
            <input placeholder="login" id="login" type="text"  {...register('login', {
               required: true
            })} aria-invalid={errors.login ? "true" : "false"} /></p>
         {errors.login?.type === 'required' && <p >login is required</p>}
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


export default Register