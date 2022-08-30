import React, { useEffect, useState } from "react";
import "./ProfileCard.css";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/AuthActions";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";

const ProfileCard = ({location}) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [modalOpened, setModalOpened] = useState(false);


  

  const handleLogOut = ()=> {
    dispatch(logout())
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

   

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (

      <div className="ProfileInfo">
          <div style={{ textAlign: "center", paddingBottom: "16px" }}>
          <span style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }} onClick={() => setModalOpened(true)}>
            Edit Profile 
            <UilPen
              width="2rem"
              height="1.2rem"
            />
          </span>

          <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
           
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
      </div>
        
      )}
    </div>
  );
};

export default ProfileCard;
