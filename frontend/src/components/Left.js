import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const Left = () => {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`);
         dispatch(getUser(null));
         dispatch(getOtherUsers(null));
         dispatch(getMyProfile(null));
        toast.success(res.data.message);
        navigate("/login");
    } catch (error) {
        
    }
}

  return (
    <div className='w-[20%]'>
        <div>
            <div>
                <img width={"120px"} src="https://img.freepik.com/premium-vector/eps10-vector-inclusion-social-equity-line-art-icon-support-symbol-isolated-white-background_401257-261.jpg?w=740" alt='logo'/>
            </div>
            <div className='my-4'>
                <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                    <div>
                    <IoHome size={"20px"}/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                    <div>
                    <FaSearch size={"20px"}/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Search</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                    <div>
                    <LuMessageCircle size={"20px"}/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Message</h1>
                </div>
                <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                    <div>
                    <CgProfile size={"20px"}/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>
                <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full' >
                    <div>
                    <IoIosLogOut size={"20px"}/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
                <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>New Post</button>
            </div>
        </div>
    </div>
  )
}

export default Left