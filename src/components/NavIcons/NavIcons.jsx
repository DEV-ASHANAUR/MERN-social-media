import React from 'react'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from 'react-router-dom';
const NavIcons = () => {
    return (
        <div className="navIcons">
            <Link to="../home">
                <img src={Home} alt='home' />
            </Link>
            <Link to="../chat">
                <img src={Comment} alt='Comment' />
            </Link>
            <UilSetting onClick={()=>alert("This page is not ready Now!")} />
            <img src={Noti} alt='notification' onClick={()=>alert("This page is not ready Now!")} />
        </div>
    )
}

export default NavIcons