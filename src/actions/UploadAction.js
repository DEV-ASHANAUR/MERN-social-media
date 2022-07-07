import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch)=>{
    try {
        // console.log(first)
        await UploadApi.uploadImage(data);
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data) => async(dispatch) =>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data);
        console.log("check post",newPost);
        dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
    } catch (error) {
        console.log("have any error",error)
        dispatch({type: "UPLOAD_FAIL"});
    }
}