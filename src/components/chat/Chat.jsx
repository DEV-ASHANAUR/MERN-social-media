import React from 'react'
import './Chat.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import NavIcons from '../NavIcons/NavIcons'
import Conversation from '../Conversation/Conversation'
import ChatBox from '../ChatBox/ChatBox'
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // get all user for chat
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    })
  }, [user]);

  // send message to socket server

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  //get the message from socket server
  useEffect(() => {
    socket.current.on("recive-message", (data) => {
      console.log("received a message",data)
      setReceivedMessage(data);
    })
  })

  //chect online user
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((id) => id !== user._id);
    const online = onlineUsers.find((user)=>user.userId == chatMember);
    return online ? true : false;
  }

  return (
    <div className='Chat'>
      {/* left_side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {/* here conversation */}
            {chats.map((chat, i) => (
              <div key={i} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* right_side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage}
          receivedMessage={receivedMessage} />
      </div>
    </div>
  )
}

export default Chat