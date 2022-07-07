import * as AuthApi from "../api/AuthRequests";

export const logIn = (fromData,navigate) => async (dispatch)=>{
    dispatch({type:"AUTH_START"});
    try {
        const {data} = await AuthApi.logIn(fromData);
        dispatch({type:"AUTH_SUCCESS",data:data});
        navigate("../home",{replace:true});
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL",data:error.response.data});
    }
}

export const signUp = (fromData,navigate) => async (dispatch)=>{
    dispatch({type:"AUTH_START"});
    try {
        const {data} = await AuthApi.signUp(fromData);
        dispatch({type:"AUTH_SUCCESS",data:data});
        navigate("../home",{replace:true});
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL",data:error.response.data});
    }
}

export const logout = () => async (dispatch)=>{
    dispatch({type: "LOG_OUT"});
}