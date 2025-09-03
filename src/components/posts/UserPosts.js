import React, { useEffect, useState } from "react";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch("http://localhost/mindConnect/api/get_user_posts.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPosts(data.posts);
        } else {
          console.error("No posts:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No posts yet.</p>;
  }

  return (
    <div className="mx-3 my-4 space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-blue-600">{post.title}</h2>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-gray-400 text-sm mt-2">
            Posted on {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
