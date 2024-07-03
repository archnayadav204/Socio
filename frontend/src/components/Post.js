import axios from 'axios';
import React from 'react'
import Avatar from 'react-avatar';
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { POST_API_END_POINT, timeSince } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/postSlice';
import { MdDeleteOutline } from "react-icons/md";
const Post = ({post}) => {
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (id)=> {
        try{
            const res = await axios.put(`${POST_API_END_POINT}/like/${id}`, {id:user?._id}, {
                withCredentials:true,
            })
            console.log(res);
            dispatch(getRefresh());
             toast.success(res.data.message);
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deletePostHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${POST_API_END_POINT}/delete/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }

  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex p-4'>
            <Avatar src="https://avatar.iran.liara.run/public/5" size="30" round={true} />
            <div className='ml-2 w-full'>
            <div className='flex items-center '>
                <h1 className='font-bold'>{post?.userDetails[0]?.name}</h1>
                <p className='text-gray-500 text-sm ml-1'>{`@${post?.userDetails[0]?.username}  .... ${timeSince(post?.createdAt)}`}</p>
            </div>
            <div>
                <p>{post?.description}</p>
            </div>
            <div className='flex justify-between my-3'>
                <div on onClick={()=>likeOrDislikeHandler(post?._id)} className='flex items-center mr-5 '>
                    <CiHeart className='hover:bg-pink-200 rounded-full cursor-pointer' size={"24px"}/>
                    <p className='ml-1 pb-0.5'>{post?.likes?.length}</p>
                </div>
                <div className='flex items-center'>
                    <FaRegCommentAlt size={"18px"}/>
                    <p className='ml-1'>0</p>
                </div>
                {
                    user?._id===post?.userId &&(
                        <div onClick={()=>deletePostHandler(post?._id)} className='flex items-center'>
                    <MdDeleteOutline className='hover:bg-red-400 rounded-full cursor-pointer' size={"24px"}/>
                </div>
                    )
                }
                
            </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Post