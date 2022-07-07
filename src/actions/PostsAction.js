import * as PostApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async(dispatch) => {
    dispatch({type:"RETREIVING_START"});
    try {
        const { data } = await PostApi.getTimelinePosts(id);
        console.log("post data",data);
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
}