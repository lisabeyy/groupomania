import React, { useState } from "react";
import "./Post.css";
import Heart from "../../img/like.png";
import Comment from "../../img/comment.png";
import NotLike from "../../img/notlike.png";
import { likePost, deletePost, updatePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import PostModal from "../PostModal/PostModal";

const Post = ({refresher, data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [modalOpened, setModalOpened] = useState(false);
  const [postData, setPostData] = useState(null);

  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };


  const handleToUpdate = () => refresher('');
  const handleDelete = () => {
    deletePost(data._id, user._id, user.isAdmin).then( r => {
     handleToUpdate();
    });
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
          <img src={Comment} alt="" />
        {(data.userId == user._id || user.isAdmin === true) && 
            <UilPen
            style={{ cursor: "pointer" }}
            onClick={() => setModalOpened(true)}
            width="2rem"
            height="1.2rem"
          />
       }
       {(data.userId == user._id || user.isAdmin === true) && 
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
        <span>{postData ? postData.desc : data.desc}</span>
      </div>
      <PostModal
          modalOpened={modalOpened}
          setPostData={setPostData}
          setModalOpened={setModalOpened}
          data = {data}
      />
    </div>

    
  );
};

export default Post;
