import React from 'react'
import './FollowersCard.css'

import {Followers} from '../../Data/FollowersData';
const FollowersCard = () => {
  return (
    <div className='FollowersCard'>
        <h3>Who is Following you</h3>

        {Followers.map((follower,id)=>{
            return(
                <div className="follower">
                    <div>
                        <img src={follower.img} alt="" className='followerImage' />
                        <div className="name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <div className="button fc-button">
                        Follow
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard