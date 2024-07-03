import express from "express";
import { createPost, deletePost, getAllPosts, getFollowingPosts, likeOrDislike } from "../controllers/postController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createPost);
router.route("/delete/:id").delete(isAuthenticated,deletePost);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/allposts/:id").get(isAuthenticated, getAllPosts);
router.route("/followingposts/:id").get(isAuthenticated, getFollowingPosts);
export default router;