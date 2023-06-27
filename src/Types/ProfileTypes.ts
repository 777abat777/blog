import { PostType } from "./PostTypes"

export type profileDataType = {
   about: string,
   blog_posts: Array<PostType> | null
   comments: Array<any> | null
   id: number
   user_name: string
}