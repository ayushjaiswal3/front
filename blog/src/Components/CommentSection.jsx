import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from '@mui/material'
function CommentSection({postId}) {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-2xl p-3 w-full mx-auto'>   
     {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img  className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
            <Link to={'/dashboard?tag=profile'} className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
            </Link>
        </div>
     ) :
     (
        <div className=''>
            You must signed in to comment

        </div>
     )}
    </div>
  )
}

export default CommentSection
