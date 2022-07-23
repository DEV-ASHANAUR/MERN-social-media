import React from 'react'
import Profile from '../../img/img2.png'
import {useDispatch} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import {getUser} from '../../api/UserRequests';
const Conversation = ({data,currentUser,online}) => {
    const dispatch = useDispatch();
    const [userData,setUserData] = useState(null);

    //find recever user by data 
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUser);
        const getUserData = async ()=>{
            try {
                const {data} = await getUser(userId);
                setUserData(data);
                dispatch({type:"SAVE_USER",data:data});
            } catch (error) {
                console.log(error)
            }
        }
        getUserData();
    },[]);
    return (
        <>
            <div className='follower conversation'>
                <div>
                    {online && <div className="online-dot"></div>}
                    
                    <img src={userData?.profilePicture? userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="profile" className='followerImage' style={{ width: "50px", height: "50px" }} />

                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            {/* <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> */}
        </>
    )
}

export default Conversation