import React, { useState } from 'react'
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

const submitHandler = async (e) => {
    e.preventDefault();
    if(isLogin){
        try{
            const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
                headers: {
                  'Content-Type': "application/json"
                },
                withCredentials: true
              }); 
              dispatch(getUser(res?.data?.user));
             if(res.data.success){
                navigate("/");
                toast.success(res.data.message);
             }
            } catch (error) {
              toast.success(error.response.data.message);
              console.log(error);
            }
    }else {
        //signup
        try{
            const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
                headers: {
                  'Content-Type': "application/json"
                },
                withCredentials: true
              }); 
              if(res.data.success){
                setIsLogin(true);
                
                toast.success(res.data.message);
              }
        }catch(error){
            toast.success(error.response.data.message);
            console.log(error)
        }
    }
}

    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
      }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex items-center justify-evenly w-[80%]'>
            <div>
            <img className='ml-5' width={"500px"} src="https://img.freepik.com/premium-vector/eps10-vector-inclusion-social-equity-line-art-icon-support-symbol-isolated-white-background_401257-261.jpg?w=740" alt='logo'/>
            </div>
            <div>
                <div className='my-5'>
                    <h1 className='font-bold text-6xl'>
                        Connecting People
                    </h1>
                </div>
                <h1 className='ml-1 mt-4 mb-2 text-2xl font-bold' >{isLogin ? "Login" : "SignUp"}</h1>
                <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
                {
              !isLogin && (<>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
              </>)
            }
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email'className='outline-black-600 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'/>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-black-600 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'/>
                     <button className='rounded-full py-2 bg-[#1D9BF0] text-white text-lg my-4 border border-gray-800'>{isLogin ? "Login" : "Create Account"}</button>
                     <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "SignUp" : "Login"}</span></h1>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login