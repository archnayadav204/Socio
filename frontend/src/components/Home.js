import React, { useEffect } from 'react'
import Feed from './Feed'
import Left from './Left'
import Right from './Right'
import {Outlet, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hooks/useOtherUSers'
import useGetMyPosts from '../hooks/useGetMyPosts'



const Home = () => {
  const {user, otherUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
useOtherUsers(user?._id);
useGetMyPosts(user?._id);


  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <Left/>
      <Outlet/>
    <Right otherUsers={otherUsers}/>
    
    </div>
  )
}

export default Home