import React from 'react'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Right = ({otherUsers}) => {
  return (
    <div className='w-[25%]'>
      <div className='p-4 bg-gray-100 rounded-2xl my-3 w-full'>
        <h1 className='font-bold text-lg'>Suggestions</h1>
        {
          otherUsers?.map((user)=> {
            return(
              <div key={user?._id} className='flex items-center justify-between'>
              <div className='flex'>
                <div>
                <Avatar src="https://avatar.iran.liara.run/public/5" size="30" round={true} />
                </div>
                <div className='ml-2'>
                  <h1 className='font-bold'>{user?.name}</h1>
                  <p className='text-sm'>{`@${user?.username}`}</p>
                </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                  <button className='bg-black rounded-full px-4 text-white'>Profile</button>
                  </Link>
                
                </div>
              </div>
            )
          })
        }
       
      </div>
    </div>
  )
}

export default Right