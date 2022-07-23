import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './ProfileCard.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserApi from '../../api/UserRequests';

const ProfileCard = ({ location }) => {
    const params = useParams();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts)
    const [profileUser, setProfileUser] = useState({});
    //if page is in profile
    const profileUserId = params.id;

    useEffect(() => {
        if (location === 'profilePage') {
            const fetchProfileUser = async () => {

                if (profileUserId === user._id) {
                    setProfileUser(user);
                } else {
                    const profileUser = await UserApi.getUser(profileUserId);
                    setProfileUser(profileUser.data);
                }
            }
            fetchProfileUser();
        }
    }, [user]);
    return (
        <div className='ProfileCard'>
            {
                (location === 'profilePage') ? (
                    <div className="ProfileImages">
                        <img src={
                            profileUser.coverPicture
                                ? profileUser.coverPicture
                                : serverPublic + "defaultCover.jpg"
                        } alt="cover" />
                        <img src={
                            profileUser.profilePicture
                                ? profileUser.profilePicture
                                : serverPublic + "defaultProfile.png"
                        } alt="cover" />
                    </div>
                ) :
                    (
                        <div className="ProfileImages">
                            <img src={
                                user.coverPicture
                                    ? user.coverPicture
                                    : serverPublic + "defaultCover.jpg"
                            } alt="cover" />
                            <img src={
                                user.profilePicture
                                    ? user.profilePicture
                                    : serverPublic + "defaultProfile.png"
                            } alt="cover" />
                        </div>
                    )
            }
            {
                (location === 'profilePage') ? (
                    <div className="ProfileName">
                        <span>{profileUser?.firstname} {profileUser?.lastname}</span>
                        <span>{profileUser.about ? profileUser.about : 'Write about yourself'}</span>
                    </div>
                ) : (
                    <div className="ProfileName">
                        <span>{user.firstname} {user.lastname}</span>
                        <span>{user.about ? user.about : 'Write about yourself'}</span>
                    </div>
                )
            }


            <div className="followStatus">
                <hr />
                <div>
                    {
                        (location === 'profilePage') ? (
                            <div className="follow">
                                <span>{profileUser.following?.length}</span>
                                <span>Following</span>
                            </div>
                        ) : (
                            <div className="follow">
                                <span>{user.following.length}</span>
                                <span>Following</span>
                            </div>
                        )
                    }


                    <div className="vl"></div>
                    {
                        (location === 'profilePage') ? (
                            <div className="follow">
                                <span>{profileUser.followers?.length}</span>
                                <span>Followers</span>
                            </div>
                        ) : (
                            <div className="follow">
                                <span>{user.followers.length}</span>
                                <span>Followers</span>
                            </div>
                        )
                    }


                    {(location === 'profilePage') && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{
                                    posts.filter((post) => post.userId === profileUser._id).length
                                }</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {(location === 'profilePage') ? ("") :
                (<span>
                    <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        My Profile
                    </Link>
                </span>)
            }
        </div>
    )
}

export default ProfileCard