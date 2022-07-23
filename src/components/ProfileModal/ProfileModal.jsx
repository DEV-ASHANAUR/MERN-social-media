import React from 'react'
import './ProfileModal.css';
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {updateUser} from '../../actions/UserAction';
import axios from 'axios';

const ProfileModal = ({ modalOpened, setModalOpened,data }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const param = useParams();
    const {password, ...other} = data;
    const [formData,setFormData] = useState(other);
    const [profileImage,setProfileImage] = useState(null);
    const [coverImage,setCoverImage] = useState(null);
    const {updateLoading} = useSelector((state)=>state.authReducer);


    //handleChange
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    //onImageChange
    const onImageChange = (event) =>{
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
        }
    }
    //handleSubmit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let UserData = formData;
        //if profile image
        if(profileImage){
            const data = new FormData();
            data.append("file",profileImage);
            data.append("upload_preset","waeorw8w");
            // const fileName = Date.now() + profileImage.name;
            // data.append("name",fileName);
            // data.append("file",profileImage);
            // UserData.profilePicture = fileName;
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/dmgagw7ec/image/upload",data);
                // dispatch(uploadImage(data));
                UserData.profilePicture = res.data.url;
                // console.log("upload profile",res.data.url);
            } catch (error) {
                console.log(error)
            }
        }
        //if cover image
        if(coverImage){
            const data = new FormData();
            data.append("file",coverImage);
            data.append("upload_preset","waeorw8w");
            // const fileName = Date.now() + coverImage.name;
            // data.append("name",fileName);
            // data.append("file",coverImage);
            // UserData.coverPicture = fileName;
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/dmgagw7ec/image/upload",data);
                // dispatch(uploadImage(data));
                UserData.coverPicture = res.data.url;
                // console.log("upload cover",res.data.url);
            } catch (error) {
                console.log(error)
            }
        }
        //whole data update
        dispatch(updateUser(param.id,UserData));
        setModalOpened(false);
    }
    return (
        <Modal overlayColor={
            theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
        }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}>
            <form className="infoForm" onSubmit={handleSubmit}>
                <h3>Your info</h3>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="firstname"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formData.firstname}
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="worksAt"
                        placeholder="Works at"
                        onChange={handleChange}
                        value={formData.worksAt}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="about"
                        placeholder="profession"
                        onChange={handleChange}
                        value={formData.about}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="livesin"
                        placeholder="Lives in"
                        onChange={handleChange}
                        value={formData.livesin}
                    />

                    <input
                        type="text"
                        className="infoInput"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        value={formData.country}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        placeholder="RelationShip Status"
                        name='relationship'
                        onChange={handleChange}
                        value={formData.relationship}
                    />
                </div>


                <div>
                    <div className="upload-div">
                        <small>Profile Image</small>
                        <input type="file" name='profileImage' onChange={onImageChange} />
                    </div>
                    <div className='upload-div'>    
                        <small>Cover Image</small>
                        <input type="file" name="coverImage" onChange={onImageChange} />
                    </div>
                </div>

                <button className="button info-button" type='submit' disabled={updateLoading}>{updateLoading?"Updating":"Update"}</button>
            </form>

        </Modal>
    )
}

export default ProfileModal