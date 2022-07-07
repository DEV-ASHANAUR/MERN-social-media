import React, { useState } from 'react'
import './Auth.css';
import Logo from "../../img/logo.png";
import {useDispatch,useSelector} from 'react-redux';
import {logIn,signUp,logout} from '../../actions/AuthActions';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialState = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: "",
    }
    const {loading,error} = useSelector((state)=>state.authReducer);
    const [data,setData] = useState(initialState);
    const [confirmPass,setConfirmPass] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    //reset form
    const resetForm = () =>{
        setData(initialState);
        setConfirmPass(confirmPass);
    }
    //handle change in input
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    //handleSubmit
    const handleSubmit = (e)=>{
        setConfirmPass(true);
        e.preventDefault();
        if(isSignUp){
            if(data.firstname && data.lastname && data.username && data.password && data.confirmpass){
                data.password === data.confirmpass?dispatch(signUp(data,navigate)):setConfirmPass(false)
                
            }else{
                toast.error("All field are required!",{position: "bottom-right"});
            }
            
        }else{
            if(data.username && data.password){
                dispatch(logIn(data,navigate));
            }else{
                toast.error("All field are required!",{position: "bottom-right"});
            }
        }
    }

    if(error){
        toast.error(error.message,{position: "bottom-right"});
        dispatch(logout());
    }

    return (
        <div className='Auth'>
            <ToastContainer />
            <div className="a-left">
                <img src={Logo} alt="logo" />
                <div className="webname">
                    <h1>MAR Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>
            {/* a-right */}
            <div className="a-right">
                <form className='infoForm authFrom' onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Register" : "Login"}</h3>
                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                value={data.confirmpass}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                     <span style={{
                        fontSize: "12px",
                        color: "red",
                        alignSelf: "flex-end",
                        marginRight: "5px",
                        display: confirmPass ? "none":"block"
                     }}>
                        *Confirm password is not Match
                    </span>       
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={()=>{
                            resetForm();
                            setIsSignUp((prev)=>!prev)
                        }}>{isSignUp ? "Already have an account. Login!" : "Don't have an account Sign up"}
                        </span>
                        <button className="button info-button" type="submit" disabled={loading}>{loading? "Loading..." : isSignUp?"Signup":"Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
};


export default Auth