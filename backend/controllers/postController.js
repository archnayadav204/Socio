import { Post } from "../models/postSchema.js";
import {User} from "../models/userSchema.js"

export const createPost = async(req, res)=>{
    try{
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Post.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Shared successfully.",
            success:true,
        })
    } catch(error){
        console.log(error);
    }
}
export const deletePost = async (req,res) => {
    try {
        const {id}  = req.params;
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Post deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(post.likes.includes(loggedInUserId)){
            // dislike
            await Post.findByIdAndUpdate(postId,{$pull:{likes:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Post.findByIdAndUpdate(postId, {$push:{likes:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};
export const getAllPosts = async (req,res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserPosts = await Post.find({userId:id});
        const followingUserPost = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Post.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            posts:loggedInUserPosts.concat(...followingUserPost),
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingPosts = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserPost = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Post.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            posts:[].concat(...followingUserPost)
        });
    } catch (error) {
        console.log(error);
    }
}
