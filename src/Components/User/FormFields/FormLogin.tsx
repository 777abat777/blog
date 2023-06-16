import { useFormContext } from "react-hook-form";

const FormLogin = () => {
   const methods = useFormContext();
   return (
      <div>
         <p>
            <label htmlFor="login">Login:</label>
            <input placeholder="login" id="login" type="text"  {...methods.register('login', { required: true })}
               aria-invalid={methods.formState.errors.login ? "true" : "false"} />
         </p>
         {methods.formState.errors.login?.type === 'required' && <p >login is required</p>}
      </div>
   )
}

export default FormLogin