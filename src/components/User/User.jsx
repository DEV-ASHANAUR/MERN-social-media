import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from '../../actions/UserAction';
const User = ({ person }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    //handleFollow
    const handleFollow = () => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
    }
    return (
        <div className="follower">
            <div>
                <Link to={`/profile/${person._id}`}>
                    <img src={person.profilePicture
                        ? serverPublic + person.profilePicture
                        : serverPublic + "defaultProfile.png"} alt="" className='followerImage' />
                </Link>
                <Link to={`/profile/${person._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="name">
                        <span>{person.firstname}</span>
                        <span>{person.username}</span>
                    </div>
                </Link>
            </div>
            <div className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </div>
        </div>
    )
}

export default User