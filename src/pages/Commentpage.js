import React from "react";
import Doctor_post from "../components/loginSignupComponents/doctor_post";
import Comment_box from "../components/loginSignupComponents/comment_box";
import Navbarcomponent from "../components/loginSignupComponents/navbarcomponent";

export default function Comment_page() {
    return (
        <div className="min-h-screen bg-gray-50">

            <Navbarcomponent />


            <div className="flex flex-col md:flex-row justify-center items-start gap-4 px-4 py-6">


                <div className="w-full md:w-6/12">
                    <Doctor_post />
                </div>


                <div className="w-full md:w-6/12">
                    <Comment_box />
                </div>

            </div>
        </div>
    );
}
