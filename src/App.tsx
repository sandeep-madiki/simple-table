import { useEffect, useState } from "react";
import "./App.css";
import PostTable from "./components/PostTable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts as setPostsActios } from "./store/PostsSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setLoading(false);
      dispatch(setPostsActios(response.data));
    };
    getPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <PostTable />;
}

export default App;
