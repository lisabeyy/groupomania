import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};


export const updatePost = (data) => async (dispatch) => {
  console.log('data', data);
  dispatch({ type: "UPDATE_START" });
  try {
    const newPost = await PostsApi.updatePost(data.id, data);
    dispatch({ type: "UPDATE_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATE_FAIL" });
  }
};
