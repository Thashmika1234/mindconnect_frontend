import React from "react";
import { useLocation } from "react-router-dom";
import DoctorPostCard from "../components/loginSignupComponents/doctor_post";
import Comment_box from "../components/loginSignupComponents/comment_box";
import Navbarcomponent from "../components/loginSignupComponents/navbarcomponent";

export default function Comment_page() {
  const location = useLocation();
  const { post, profilePic, displayName } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbarcomponent />

      <div className="flex flex-col md:flex-row justify-center items-start gap-4 px-4 py-6">
        {/* Left: Post */}
        <div className="w-full md:w-6/12">
          {post ? (
            <DoctorPostCard
              post={post}
              profilePic={profilePic}
              displayName={displayName}
            />
          ) : (
            <p className="text-gray-500 text-center">Post not found.</p>
          )}
        </div>

        {/* Right: Comments */}
        <div className="w-full md:w-6/12">
          <Comment_box postId={post.post_id}/>
        </div>
      </div>
    </div>
  );
}
