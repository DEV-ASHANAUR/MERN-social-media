import React, { useState, useRef } from 'react'
import './ChatBox.css';
import InputEmoji from 'react-input-emoji'
import { useEffect } from 'react';
import { getUser } from '../../api/UserRequests';
import { addMessages, getMessages } from '../../api/MessageRequests'
import {format} from 'timeago.js';
const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const imageRef = useRef();
    //handleChange
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    // fetching data for header
    useEffect(() => {
        const userId = chat?.members.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData();
    }, [chat, currentUser])

    //fetch message for a user
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data } = await getMessages(chat._id);
                // console.log("message",data)
                setMessages(data);
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessage();
    }, [chat])

    //handleSend
    const handleSend = async(e) =>{
        e.preventDefault();
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: chat._id
        }
        const reciverId = chat.members.find((id)=>id!==currentUser);
        //set message to socket server

        //send message to database
        try {
            const {data} = await addMessages(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className='ChatBox-container'>
            {chat ? (
                <>
                    {/* chat-header */}
                    <div className="chat-header">
                        <div className='follower'>
                            <div>
                                <img src={
                                    userData?.profilePicture
                                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                                        userData.profilePicture
                                        : process.env.REACT_APP_PUBLIC_FOLDER +
                                        "defaultProfile.png"
                                } alt="profile" className='followerImage' style={{ width: "50px", height: "50px" }} />
                                <div className="name" style={{ fontSize: '0.9rem' }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px" }} />
                    </div>
                    {/* chat-body */}
                    <div className="chat-body">
                        {messages?.map((message, i) => (
                            <div key={i} className={message.senderId === currentUser ? "message own":"message"}>
                                <span>{message.text}</span>
                                <span>{format(message.createdAt)}</span>
                            </div>
                      ))}

                    </div>
                    {/* send Area */}
                    <div className="chat-sender">
                        <div onClick={() => imageRef.current.click()}>+</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <div className="send-button button" onClick={handleSend}>Send</div>
                        <input type="file" style={{ display: "none" }} ref={imageRef} />

                    </div>
                </>
            ) : (
                <span className='chatbox-empty-message'>
                    Tap on a chat to start conversation.
                </span>
            )}

        </div>
    )
}

export default ChatBox