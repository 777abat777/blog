import React, { useState } from 'react'
import style from './ProfilePost.module.scss'
import { DeleteOutlined, EditOutlined, FileJpgOutlined } from '@ant-design/icons'
import { postApi } from '../../../../../API/api'
import { useAppDispatch, useAppSelector } from '../../../../../hook/hook'
import Modal from 'antd/es/modal'
import { FormProvider, useForm } from 'react-hook-form'
import { fetchProfileData } from '../../../../../Redux/ProfileSlice/ProfileSlice'

type Props = {
   category: string
   title: string
   slug: string
   status: "published" | "draft"
   id: number
   published: string
   content: string
}


const ProfilePost = ({ category, title, slug, status, id, published, content }: Props) => {

   var slugify = require('slugify')
   const username = useAppSelector((state) => state.userReducer.name)
   const userId = useAppSelector((state) => state.userReducer.id)
   let dispatch = useAppDispatch()
   const oldSlug = slug
   const [open, setOpen] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);

   const showModal = () => {
      setOpen(true);
   };

   const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
         setOpen(false);
         setConfirmLoading(false);
      }, 2000);
   };

   const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
   };


   const deletePost = (slug: string) => {
      if (window.confirm("delete post?")) {
         postApi.deletePost(slug).then(
            () => {
               dispatch(fetchProfileData(username))
            }
         )

      }
   }


   const methods = useForm();
   const { handleSubmit } = methods


   const onSubmit = (data: any) => {
      handleOk()
      let excerpt = data.content.slice(0, 100) + '...'
      let slug = slugify(data.title, {
         replacement: '-',  // replace spaces with replacement character, defaults to `-`
         remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
         lower: true,      // convert to lower case, defaults to `false`
         strict: false,     // strip special characters except replacement, defaults to `false`
         locale: 'ru',      // language code of the locale to use
         trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
      postApi.updatePost(data.title, userId, excerpt, data.content, data.status, slug, "new", data.image[0], oldSlug, published)
         .then((res) => {
            dispatch(fetchProfileData(username))
         })
   }

   return (
      <div className={style.post}>
         <div className={style.post__category}>{category}</div>
         <div className={style.post__title}> {title}</div>
         <div className={style.post__status}>{status}</div>
         <div className={style.post__edit}><EditOutlined onClick={showModal} /> <DeleteOutlined onClick={() => { deletePost(slug) }} /></div>
         <Modal
            title="Update post"
            open={open}
            onOk={handleSubmit(onSubmit)}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            className={style.modal}
            width={"70%"}
         >
            <div className={style.addPost}>
               <FormProvider {...methods} >
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <p>
                        <label htmlFor="title">title:</label>
                        <input defaultValue={title} placeholder="title" id="title" type="text"  {...methods.register('title', {
                           required: true,
                           maxLength: 35,
                           pattern: {
                              value: /^[а-яА-ЯёЁa-zA-Z0-9]/,
                              message: 'wrong title',

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
                        <textarea defaultValue={content} placeholder="content" id="content" {...methods.register('content', { required: true })} />
                        {methods.formState.errors.content?.type === 'required' && <p >content is required</p>}
                     </p>
                     <p>
                        <label htmlFor="status">status:</label>
                        <select defaultValue={status} id="status" {...methods.register('status', { required: true })}>
                           <option value="published">published</option>
                           <option value="draft">draft</option>
                        </select>
                     </p>
                  </form>
               </FormProvider>
            </div>
         </Modal>

      </div>
   )
}

export default ProfilePost