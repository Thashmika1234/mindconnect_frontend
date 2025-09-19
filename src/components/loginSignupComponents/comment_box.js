import React, { useEffect, useState } from "react";
import axios from "axios";

const Commentbox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Values from localStorage
  const userId = localStorage.getItem("user_id");
  const userType = localStorage.getItem("user_type"); // 👈 user type
  const profilePic = localStorage.getItem("profile_pic");
  const displayName = localStorage.getItem("display_name") || "You"; // fallback

  const defaultAvatar =
    "https://mindconnectstorage.blob.core.windows.net/profilepicture/default-avatar-profile-icon-social-600nw-1677509740.webp";

  // Fetch comments
  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost/mindconnect/api/get_comments.php?post_id=${postId}`)
        .then((res) => {
          if (res.data.success) {
            setComments(res.data.comments);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [postId]);

  // Handle submit
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post("http://localhost/mindconnect/api/add_comment.php", {
        post_id: postId,
        user_id: userId,
        content: newComment,
      });

      if (res.data.success) {
        // Apply anonymization logic for new comment
        const isNormal = userType === "normal";

        const newCommentObj = {
          comment_id: res.data.comment_id,
          content: newComment,
          created_at: new Date().toISOString(),
          author_name: isNormal ? "Anonymous User" : displayName,
          profile_pic: isNormal ? defaultAvatar : profilePic || defaultAvatar,
        };

        setComments([newCommentObj, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
        💬 Leave a Comment
      </h2>

      {/* Textarea */}
      <textarea
        placeholder="Share your thoughts..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full h-28 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-700 placeholder-gray-400"
      ></textarea>

      {/* Post Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          Post Comment
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Comments Section */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3">Recent Comments</h3>

        <div className="space-y-3">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div
                key={c.comment_id}
                className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={c.profile_pic || defaultAvatar}
                    alt="avatar"
                    className="w-6 h-6 rounded-full border"
                  />
                  <span className="font-medium text-blue-600">{c.author_name}:</span>
                </div>
                <p className="ml-8">{c.content}</p>
                <p className="ml-8 text-xs text-gray-500">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commentbox;
