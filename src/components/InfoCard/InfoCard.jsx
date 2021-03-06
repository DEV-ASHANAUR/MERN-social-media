import React, { useState } from 'react'
import './InfoCard.css';
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../../actions/AuthActions';
import { useEffect } from 'react';
import * as UserApi from '../../api/UserRequests';

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);

    //logout
    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
            } else {
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser.data);
            }
        }
        fetchProfileUser();
    }, [user]);

    return (
        <div className='InfoCard'>
            <div className="infoHead">
                <h4>Your Info</h4>
                {
                    profileUserId === user._id ? (
                        <div>
                            <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />

                            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
                        </div>
                    ) : ("")
                }
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship?profileUser.relationship:"Not Set Yet"}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livesin?profileUser.livesin:"Not Set Yet"}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.worksAt? profileUser.worksAt:"Not Set Yet"}</span>
            </div>

            <button className='button logout-button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default InfoCard