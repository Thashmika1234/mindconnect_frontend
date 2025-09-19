import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DoctorPostCard = ({ post, profilePic, displayName }) => {
  const user_id = localStorage.getItem("user_id");

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  // Fetch initial likes for this post
  useEffect(() => {
    axios
      .get("http://localhost/mindConnect/api/get_post_likes.php", {
        params: { post_id: post.post_id, user_id },
      })
      .then((res) => {
        if (res.data.success) {
          setLiked(res.data.liked);
          setTotalLikes(res.data.total_likes);
        }
      })
      .catch((err) => console.error("Like fetch error:", err));
  }, [post.post_id, user_id]);

  const handleLike = () => {
    axios
      .post("http://localhost/mindConnect/api/toggle_like.php", {
        post_id: post.post_id,
        user_id,
      })
      .then((res) => {
        if (res.data.success) {
          setLiked(res.data.liked);
          setTotalLikes(res.data.total_likes);
        }
      })
      .catch((err) => console.error("Toggle like error:", err));
  };

  return (
    <div className="flex justify-center w-full pb-4">
      <div className="relative bg-blue-50 rounded-2xl shadow-lg flex flex-col items-center justify-start text-black text-xl font-semibold border border-gray-300 w-full md:max-w-2xl">

        {/* Avatar + Name */}
        <div>
          <div className="absolute top-3 left-3 flex items-center space-x-3">
            <div className="shadow-lg rounded-full bg-white border border-gray-300 w-16 h-16 p-1 flex items-center justify-center">
              <button>
                <img
                  src={profilePic || "/default_avatar.png"}
                  alt="Doctor"
                  className="w-14 h-14 rounded-full"
                />
              </button>
            </div>
            <div className="text-base font-semibold text-gray-700 flex flex-col">
              <h1>{displayName}</h1>
              <h1 id="datediv" className="text-sm font-normal text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </h1>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4 w-full mt-24 text-left">
            <p className="text-gray-800 text-sm font-normal leading-relaxed text-left">
              {post.content}
            </p>
          </div>
        </div>

        {/* Optional Image */}
        {post.post_file_url && (
          <div className="mt-6 px-4 w-full">
            <img
              src={post.post_file_url}
              alt="Content"
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}

        {/* Like & Comment Buttons */}
        <div className="flex justify-between px-6 py-3 w-full">
          <button
  onClick={handleLike}
  className={`border rounded-lg px-6 py-2 text-sm transition ${
    liked
      ? "bg-blue-200 border-blue-400 text-blue-700"
      : "bg-white border-gray-300 text-blue-600 hover:bg-blue-100"
  }`}
>
  👍 Like{totalLikes > 0 ? ` · ${totalLikes}` : ""}
</button>

          <Link
  to={"/Commentpage"}
  state={{ post, profilePic, displayName }}
>
  <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm text-blue-600 hover:bg-blue-100">
    💬 Comment
  </button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default DoctorPostCard;
