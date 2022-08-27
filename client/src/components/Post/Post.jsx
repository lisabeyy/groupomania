import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, deletePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { UilTrashAlt } from "@iconscout/react-unicons";

const Post = ({refresher, data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };


  const handleToUpdate = () => refresher('');
  const handleDelete = () => {
    handleToUpdate();
    deletePost(data._id, user._id);

  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {data.userId == user._id && 
            <UilTrashAlt
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
            onClick={handleDelete}
            width="2rem"
            height="1.2rem"
          />
        }
       
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
