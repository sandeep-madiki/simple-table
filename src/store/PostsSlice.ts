import { createSlice } from "@reduxjs/toolkit";

const PostsSlice = createSlice({
  name: "postSlice",
  initialState: { posts: [] },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = PostsSlice.actions;
export default PostsSlice.reducer;
