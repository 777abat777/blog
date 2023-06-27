import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { postApi } from '../../API/api';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { fetchPosts } from '../../Redux/PostSlice/postsSlice';
import style from './AddPost.module.scss'
import { FileJpgOutlined } from '@ant-design/icons';



type Props = {}


const AddPost = (props: Props) => {
   var slugify = require('slugify')

   let dispatch = useAppDispatch()
   let [complete, setComplete] = useState(false)
   let user = useAppSelector(state => state.userReducer)

   const methods = useForm();
   const { handleSubmit } = methods

   const onSubmit = (data: any) => {
      let excerpt = data.content.slice(0, 100) + '...'
      let slug = slugify(data.title, {
         replacement: '-',  // replace spaces with replacement character, defaults to `-`
         remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
         lower: true,      // convert to lower case, defaults to `false`
         strict: false,     // strip special characters except replacement, defaults to `false`
         locale: 'ru',      // language code of the locale to use
         trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
      postApi.addPost(data.title, user.id, excerpt, data.content, data.status, slug, "new", data.image[0])
         .then((res) => {
            setComplete(true)
            dispatch(fetchPosts())
         })

   }

   if (complete) { return <Navigate to="/new" /> }
   return (
      <div className={style.addPost}>
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
               <p>
                  <label htmlFor="title">title:</label>
                  <input placeholder="title" id="title" type="text"  {...methods.register('title', {
                     required: true,
                     maxLength: 35,
                     pattern: {
                        value: /^[а-яА-ЯёЁa-zA-Z0-9]/,
                        message: 'wrong title'
                     }
                  })} aria-invalid={methods.formState.errors.title ? "true" : "false"} />
                  {methods.formState.errors.title?.type === 'required' && <p className={style.error}>title is required</p>}
                  {methods.formState.errors.title?.type === 'pattern' && <p className={style.error}>enter correct title</p>}
                  {methods.formState.errors.title?.type === 'maxLength' && <p className={style.error}>max length 35</p>}
               </p>
               <p className={style.image__field}>
                  <label htmlFor="image"><FileJpgOutlined className={style.image__icon} /></label>
                  <input placeholder="image" id="image" type={"file"}  {...methods.register('image', { required: false })} />
               </p>
               <p>
                  <label htmlFor="content">content:</label>
                  <textarea placeholder="content" id="content" {...methods.register('content', { required: true })} />
               </p>
               {methods.formState.errors.content?.type === 'required' && <p >content is required</p>}
               <p>
                  <label htmlFor="status">status:</label>
                  <select id="status" {...methods.register('status', { required: true })}>
                     <option value="published">published</option>
                     <option value="draft">draft</option>
                  </select>
               </p>

               <button className={style.button}>Добавить</button>
            </form>
         </FormProvider>
      </div>
   )
}

export default AddPost