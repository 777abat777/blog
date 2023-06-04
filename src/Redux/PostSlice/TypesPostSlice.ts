// Define a type for the slice state
export interface PostsStateInterface {
   posts: Array<PostType>,
   loading: boolean,
   error: string | null | undefined,
}

export type PostType = {
   id: number
   title: string
   author: number
   excerpt: string
   content: string
   status: "published" | "draft"
   slug: string
}

export type ResponseData = {
   error: null,
   items: Array<PostType>,
}