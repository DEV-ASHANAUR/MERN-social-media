import React,{useState,useRef} from 'react'
import './ChatBox.css';
import Profile from '../../img/img2.png'
import InputEmoji from 'react-input-emoji'
const ChatBox = () => {
    const [newMessage, setNewMessage] = useState("");
    const imageRef = useRef();
    //handleChange
    const handleChange = (newMessage)=>{
        setNewMessage(newMessage)
    }
    return (
        <div className='ChatBox-container'>
            {/* chat-header */}
            <div className="chat-header">
                <div className='follower'>
                    <div>
                        <img src={Profile} alt="profile" className='followerImage' style={{ width: "50px", height: "50px" }} />
                        <div className="name" style={{ fontSize: '0.9rem' }}>
                            <span>Ashanur Rahman</span>
                        </div>
                    </div>
                </div>
                <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px" }} />
            </div>
            {/* chat-body */}
            <div className="chat-body">
                <>
                    <div className="message own">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, mollitia maxime.</span>
                        <span>just now</span>
                    </div>
                </>
            </div>
            {/* send Area */}
            <div className="chat-sender">
                <div onClick={()=>imageRef.current.click()}>+</div>
                <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                />
                <div className="send-button button">Send</div>
                <input type="file" style={{display:"none"}} ref={imageRef} />
                
            </div>
        </div>
    )
}

export default ChatBox