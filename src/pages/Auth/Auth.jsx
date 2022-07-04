import React from 'react'
import './Auth.css';
import Logo from "../../img/logo.png";
const Auth = () => {
    return (
        <div className='Auth'>
            <div className="a-left">
                <img src={Logo} alt="logo" />
                <div className="webname">
                    <h1>MAR Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>
            <Login />
        </div>
    )
};

const Login = () => {
    return (
        <div className="a-right">
            <form className='infoForm authFrom'>
                <h3>Log In</h3>

                <div>
                    <input type="text" placeholder='Username' className="infoInput" name="username" />
                </div>

                <div>
                    <input type="password" placeholder='Password' className="infoInput" name="password" />
                </div>

                <div>
                    <span style={{ fontSize: "12px",cursor:"pointer" }}>
                        Don't have an account Sign up
                    </span>
                    <button className='button info-button'>Login</button>
                </div>
            </form>
        </div>
    )
}

const SignUp = () => {
    return (
        <div className="a-right">
            <form className='infoForm authFrom'>
                <h3>Sign up</h3>

                <div>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="infoInput"
                        name="firstname"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="infoInput"
                        name="lastname"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="username"
                        placeholder="Usernames"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="confirmpass"
                        placeholder="Confirm Password"
                    />
                </div>

                <div>
                    <span style={{ fontSize: '12px',cursor:"pointer" }}>Already have an account. Login!</span>
                    <button className="button info-button" type="submit">Signup</button>
                </div>
                
            </form>
        </div>
    )
}

export default Auth