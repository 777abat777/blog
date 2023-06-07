import React from 'react'
import { useFormContext } from "react-hook-form";

const FormEmail = () => {
   const methods = useFormContext();
   return (
      <div>
         <p> <label htmlFor="email">Email:</label>
            <input placeholder="Email" id="email" type="text" {...methods.register('email', {
               required: true,
               pattern: {
                  value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: 'error'
               },

            })} aria-invalid={methods.formState.errors.email ? "true" : "false"} /></p>
         {methods.formState.errors.email?.type === 'required' && <p >email is required</p>}
         {methods.formState.errors.email?.type === 'pattern' && <p >enter correct email</p>}
      </div>
   )
}

export default FormEmail
