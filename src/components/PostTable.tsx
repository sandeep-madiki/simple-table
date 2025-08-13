import React, { useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import PostComment from "./PostComment";

interface Post {
  title: string;
  body: string;
  id: number;
}

const PostTable = () => {
  const { posts } = useSelector(
    (state: { posts: { posts: Post[] } }) => state.posts
  );
  console.log(posts);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const startIndex = (pageIndex - 1) * pageSize;
  const filteredPosts = posts?.slice(startIndex, startIndex + pageSize);

  const totalButtons = Math.ceil((posts.length || 0) / pageSize);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <table className="table-con">
        <thead>
          <tr className="t-head">
            <th className="cell-con">Title</th>
            <th className="cell-con">Body</th>
            <th className="cell-con">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts?.map((post: Post) => {
            return (
              <tr key={post.id}>
                <td className="cell-con">{post.title}</td>
                <td className="cell-con">{post.body}</td>
                <td className="cell-con-1">
                  <button onClick={() => openModal(post)}>i</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="page-btn-con">
        {Array.from({ length: totalButtons }, (_, i) => {
          return (
            <button
              key={i}
              onClick={() => setPageIndex(i + 1)}
              style={{ fontWeight: pageIndex === i + 1 ? "bold" : "normal" }}
              className="btn-style"
            >
              {i + 1}
            </button>
          );
        })}
        <select
          value={pageSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPageSize(Number(e.target.value))
          }
        >
          <option value={10}>10</option>
          <option value={5}>5</option>
          <option value={2}>2</option>
        </select>
      </div>
      {isModalOpen && selectedPost && (
        <div className="modal-overlay-1">
          <div className="modal-content">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <PostComment postId={selectedPost.id} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTable;
