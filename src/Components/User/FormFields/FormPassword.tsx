import React from 'react'
import { useFormContext } from "react-hook-form";
type Props = {}

const FormPassword = (props: Props) => {
   const methods = useFormContext();
   return (
      <div>
         <div>
            <p><label htmlFor="password">Password:</label>
               <input placeholder="password" id="password" type="password"  {...methods.register('password', { required: true, minLength: 4 })} aria-invalid={methods.formState.errors.name ? "true" : "false"} /></p>
            {methods.formState.errors.password?.type === 'required' && <p >password is required</p>}
            {methods.formState.errors.password?.type === 'minLength' && <p >minLength 8</p>}
            <p>
            </p>
         </div>
      </div>
   )
}

export default FormPassword