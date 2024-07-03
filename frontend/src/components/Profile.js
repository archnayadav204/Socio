import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar'
import useGetProfile from '../hooks/useGetProfile'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { getRefresh } from '../redux/postSlice';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';


const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const {id} = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            
        }else{
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
        <div >
            <div className='flex items-center py-2'>
                <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                    <IoMdArrowRoundBack size={"24px"}/>
                </Link>
                <div className='ml-2'>
                <h1 className='font-bold text-lg'>{profile?.name}</h1>
                <p className='text-gray-500 text-sm'>21 posts</p>
                </div>
            </div>
        <img src='https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1024x576.webp' alt='background' />
       
        <div className='absolute top-80 ml-2 border-4 border-white rounded-full'>
        <Avatar src="https://avatar.iran.liara.run/public/5" size="120" round={true} />
        </div>
        <div className='text-right m-4'>
        {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-500 rounded-full border bg-black border-gray-400 text-white'>Edit Profile</button>

                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
        </div>
        <div className='m-4'>
            <h1 className='font-bold text-xl'>{profile?.name}</h1>
            <p>{`@${profile?.username}`}</p>
        </div>
        <div className='text-sm m-4'>
            <p>Be free, Be true, Be you</p></div>
        </div>
    </div>
  )
}

export default Profile