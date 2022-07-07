const authReducer = (state = {authData: null, loading:false,error:null,updateLoading:false},action)=>{
    switch(action.type){
        case "AUTH_START":
            return {...state,loading:true,error:null };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return {...state, authData: action.data, loading:false,error:null};
        case "AUTH_FAIL":
            return {...state,loading:false,error:action.data};

        case "LOG_OUT":
            localStorage.clear();
            return {...state, authData:null,loading:false,error:null,updateLoading:false};
        default:
            return state;
    }
}

export default authReducer;