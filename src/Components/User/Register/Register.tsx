import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { userApi } from '../../../API/api';
import FormLogin from '../FormFields/FormLogin';
import FormEmail from '../FormFields/FormEmail';
import FormPassword from '../FormFields/FormPassword';

type Props = {}


const Register = (props: Props) => {
   let [complete, setComplete] = useState(false)

   const methods = useForm();
   const { handleSubmit } = methods;

   const onSubmit = (data: any) => {
      userApi.register(data.email, data.login, data.password)
         .then((res) => {
            setComplete(true)
         });
   }

   if (complete) { return <Navigate to="/login" /> }

   return (
      <div>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormEmail />
               <FormLogin />
               <FormPassword />
               <button >Регистрация</button>
            </form>
         </FormProvider>
      </div>
   )
}




export default Register