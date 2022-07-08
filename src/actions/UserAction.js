import * as UserApi from '../api/UserRequests';

export const updateUser = (id,formData) => async (dispatch)=>{
    dispatch({type:"UPDATING_START"});
    try {
        const {data} = await UserApi.updateUser(id,formData);
        // console.log("response",data)
        dispatch({type:"UPDATING_SUCCESS",data:data})
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATING_FAIL",data:error.response.data});
    }
}