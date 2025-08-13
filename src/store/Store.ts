import { configureStore } from "@reduxjs/toolkit";
import PostsSlice from "./PostsSlice";

const Store = configureStore({
  reducer: {
    posts: PostsSlice,
  },
});

export default Store;
