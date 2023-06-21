import React from 'react'

type Props = {
   id: string | number
   body: string
   owner: string
   created: string
}


const Comment = ({ body, owner, created }: Props) => {
   return (
      <div>
         <p>{owner} {created.slice(0, 10)}</p>
         {body}
      </div>
   )
}

export default Comment