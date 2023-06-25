import { commentApi } from '../../../../API/api'
import { useAppSelector } from '../../../../hook/hook'
import { FormProvider, useForm } from 'react-hook-form'
import style from './addComment.module.scss'
import { FileJpgOutlined } from '@ant-design/icons'

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
      <div className={style.comment}>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className={style.comment__form}>
                  <textarea placeholder="оставить комментарий" id="body" {...methods.register('body', { required: true })} />
                  <label htmlFor="image"><FileJpgOutlined className={style.image__icon} /></label>
                  <input placeholder="image" id="image" type={"file"}  {...methods.register('image', { required: false })} />
                  {methods.formState.errors.body?.type === 'required' && <p >comment is required</p>}
               </div>
               <div className={style.button}>
                  <button>add comment</button>
               </div>
            </form>
         </FormProvider>
      </div>
   )
}

export default AddComment