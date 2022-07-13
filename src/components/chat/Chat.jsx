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

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null);

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
              <div key={i} onClick={()=>setCurrentChat(chat)}>
                <Conversation 
                data={chat}
                currentUser={user._id}
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
        <ChatBox chat={currentChat} currentUser={user._id} />
      </div>
    </div>
  )
}

export default Chat