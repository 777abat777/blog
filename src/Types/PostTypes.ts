import { SerializedError } from "@reduxjs/toolkit"

// Define a type for the slice state
export interface PostsStateInterface {
   posts: Array<PostType>,
   loading: boolean,
   error: SerializedError | null
}

export type PostType = {
   id: number
   title: string
   author: number
   excerpt: string
   content: string
   status: "published" | "draft"
   slug: string,
   category: string
}

export type ResponseData = {
   error: null,
   items: Array<PostType>,
}