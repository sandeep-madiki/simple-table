import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const PostComment = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setComments(response.data);
      setLoading(false);
    };
    if (postId) {
      getComments();
    }
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr className="t-head">
            <th className="cell-con">Name</th>
            <th className="cell-con">Body</th>
          </tr>
        </thead>
        <tbody>
          {comments?.map(
            (comment: {
              name: string;
              email: string;
              body: string;
              id: number;
            }) => {
              return (
                <tr key={comment.id}>
                  <td className="cell-con">
                    {comment.name}
                    <br />
                    {comment.email}
                  </td>
                  <td className="cell-con">{comment.body}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostComment;
