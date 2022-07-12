import React from 'react'
import './Chat.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import NavIcons from '../NavIcons/NavIcons'
import Conversation from '../Conversation/Conversation'
import ChatBox from '../ChatBox/ChatBox'
const Chat = () => {
  return (
    <div className='Chat'>
      {/* left_side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {/* here conversation */}
            <div>
                <Conversation />
            </div>
          </div>
        </div>
      </div>
      {/* right_side */}
      <div className="Right-side-chat">
        <div style={{width: "20rem", alignSelf: "flex-end"}}>
          <NavIcons />
        </div>
        <ChatBox />
      </div>
    </div>
  )
}

export default Chat