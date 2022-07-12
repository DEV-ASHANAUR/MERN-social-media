import React from 'react'
import Profile from '../../img/img2.png'
const Conversation = () => {
    return (
        <>
            <div className='follower conversation'>
                <div>
                    <div className="online-dot"></div>
                    <img src={Profile} alt="profile" className='followerImage' style={{ width: "50px", height: "50px" }} />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>Ashanur Rahman</span>
                        <span>offline</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}

export default Conversation