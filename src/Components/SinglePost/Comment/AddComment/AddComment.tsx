import { commentApi } from '../../../../API/api'
import { useAppSelector } from '../../../../hook/hook'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
   postId: number
   getPost: Function
}

const AddComment = (props: Props) => {
   let user = useAppSelector((state) => state.userReducer)
   const methods = useForm();
   const { handleSubmit } = methods

   const onSubmit = (data: any) => {
      commentApi.addComment(props.postId, data.body, user.id, data.image[0])
         .then((res) => {
            props.getPost()
         })
   }

   return (
      <div>
         <h1>add Comment</h1>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <p>
                  <label htmlFor="body">comment:</label>
                  <textarea placeholder="body" id="body" {...methods.register('body', { required: true })} />
               </p>
               <p>
                  <label htmlFor="image">image:</label>
                  <input placeholder="image" id="image" type={"file"}  {...methods.register('image', { required: false })} />
               </p>
               {methods.formState.errors.body?.type === 'required' && <p >comment is required</p>}
               <button>add comment</button>
            </form>
         </FormProvider>
      </div>
   )
}

export default AddComment