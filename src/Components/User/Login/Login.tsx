import React from 'react'
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { userAutorise } from '../../../Redux/UserSlice/UserSlice';
import FormEmail from '../FormFields/FormEmail';
import FormPassword from '../FormFields/FormPassword';
import style from './Login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

type Props = {}

type FormValues = {
   email: string
   password: string | number
};

const Login = (props: Props) => {
   let dispatch = useAppDispatch()
   let autorise = useAppSelector((state) => state.userReducer.autorise)


   const methods = useForm<FormValues>();
   const { handleSubmit } = methods;

   const onSubmit: SubmitHandler<FormValues> = (data) => {
      dispatch(userAutorise(data))
   }
   if (autorise) { return <Navigate to="/" /> }

   return (
      <div className={style.login}>
         <h2>Login page</h2>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <FormEmail />
               <FormPassword />
               <button>Войти <FontAwesomeIcon icon={faRightToBracket} /></button>
            </form>
         </FormProvider>
      </div>
   )
}



export default Login