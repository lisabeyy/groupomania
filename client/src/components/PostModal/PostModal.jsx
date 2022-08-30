import React, { useState, useRef } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./PostModal.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/UploadAction";
import { updatePost } from "../../actions/PostsAction";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

const PostModal = ({ modalOpened, setModalOpened, setPostData, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log('data', data);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // handle Image Change
   const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };


  const imageRef = useRef();
  // form submission

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    let PostData = formData;
    //post data
    const newPost = {
      id: PostData._id,
      userId: user._id,
      desc: PostData.desc,
      isAdmin: user.isAdmin
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updatePost(newPost));
    setModalOpened(false);
    setPostData(newPost);
  };

 

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleUpload}>
        <div>
          <input
            value={formData.desc}
            onChange={handleChange}
            type="text"
            placeholder="Quoi de neuf ?"
            name="desc"
          />
      </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default PostModal;
