import React, { useState } from 'react'
import style from './ProfilePost.module.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { postApi } from '../../../../../API/api'
import { useAppSelector } from '../../../../../hook/hook'
import Modal from 'antd/es/modal'
type Props = {
   category: string
   title: string
   slug: string
   status: "published" | "draft"
   getUserData: Function
}



const ProfilePost = ({ category, title, slug, status, getUserData }: Props) => {
   const [open, setOpen] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [modalText, setModalText] = useState('Content of the modal');
   const showModal = () => {
      setOpen(true);
   };

   const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
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

   const username = useAppSelector((state) => state.userReducer.name)
   const deletePost = (slug: string) => {
      if (window.confirm("delete post?")) {
         postApi.deletePost(slug).then(
            () => {
               getUserData(username)
            }
         )

      }
   }
   return (
      <div className={style.post}>
         <div className={style.post__category}>{category}</div>
         <div className={style.post__title}> {title}</div>
         <div className={style.post__edit}><EditOutlined onClick={showModal} /> <DeleteOutlined onClick={() => { deletePost(slug) }} /></div>
         <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
         >
            <p>{modalText}</p>
         </Modal>

      </div>
   )
}

export default ProfilePost