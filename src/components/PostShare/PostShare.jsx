import React, { useState, useRef } from 'react'
import ProfileImage from "../../img/profileImg.jpg";
import './PostShare.css';
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';
import {getTimelinePosts} from '../../actions/PostsAction'
import { ToastContainer, toast } from 'react-toastify';

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  //onImageChange
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  }
  //handleUpload
  const handleUpload = (e) => {
    e.preventDefault();
    if (desc.current.value == '') {
      toast.error("Please Write Something!", { position: "bottom-right" });
      return false;
    }
    //post
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    //if any image are selected
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      // console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost));
    dispatch(getTimelinePosts(user._id));
    resetShare();
  }
  //reset form
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  }
  return (
    <>
      <div className='PostShare'>
        <img src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        } alt="profile" />
        <div>
          <input type="text" ref={desc} placeholder="What's happening" />
          <div className="postOptions">
            <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
              <UilScenery />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <UilPlayCircle />
              Video
            </div>{" "}
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>{" "}
            <div className="option" style={{ color: "var(--shedule)" }}>
              <UilSchedule />
              Shedule
            </div>
            <button className='button ps-button' onClick={handleUpload} disabled={loading}>{loading ? "uploading" : "Share"}</button>
            <div style={{ display: "none" }}>
              <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default PostShare;