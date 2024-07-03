import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
            description:{
                type:String,
                required:true
            },
            likes:{
                type:Array,
                default:[]
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            userDetails:{
                type:Array,
                default:[]
            },
},{timestamps:true});

export const Post = mongoose.model("Post", postSchema);