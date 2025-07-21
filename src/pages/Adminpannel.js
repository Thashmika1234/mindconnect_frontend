import React, { useState, useEffect } from "react";

export default function Adminpannel() {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [postSearch, setPostSearch] = useState("");

  useEffect(() => {
    // Dummy doctor data
    setDoctors([
      {
        id: 1,
        name: "Dr. Nuwan Jayasinghe",
        username: "nuwan456",
        email: "nuwan@example.com",
        mbbsNumber: "MBBS789456",
        certificateUrl: "https://example.com/doc1.pdf",
        approved: false,
      },
    ]);

    // Dummy regular user data
    setUsers([
      { id: 1, username: "kavindya22", email: "kavi@example.com" },
      { id: 2, username: "saman56", email: "saman@example.com" },
    ]);

    // Dummy posts from users
    setPosts([
      {
        id: 1,
        userId: 1,
        username: "kavindya22",
        content: "I'm feeling very anxious lately and can’t sleep.",
      },
      {
        id: 2,
        userId: 2,
        username: "saman56",
        content: "Can someone help me with managing panic attacks?",
      },
    ]);
  }, []);

  const handleApproveDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, approved: true } : doc))
    );
  };

  const handleDeleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setPosts((prev) => prev.filter((post) => post.userId !== id));
  };

  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name} ${doc.username} ${doc.email} ${doc.mbbsNumber}`
      .toLowerCase()
      .includes(doctorSearch.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email}`
      .toLowerCase()
      .includes(userSearch.toLowerCase())
  );

  const filteredPosts = posts.filter((post) =>
    `${post.username} ${post.content}`
      .toLowerCase()
      .includes(postSearch.toLowerCase())
  );

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Admin Control Panel
      </h1>

      {/* Doctor Management */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">
          Doctor Management
        </h2>
        <input
          type="text"
          placeholder="Search doctors..."
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          value={doctorSearch}
          onChange={(e) => setDoctorSearch(e.target.value)}
        />
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-700">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">MBBS No</th>
                  <th className="py-3 px-4">Certificate</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{doc.name}</td>
                    <td className="py-2 px-4">{doc.username}</td>
                    <td className="py-2 px-4">{doc.email}</td>
                    <td className="py-2 px-4">{doc.mbbsNumber}</td>
                    <td className="py-2 px-4">
                      <a
                        href={doc.certificateUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      {doc.approved ? (
                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>
                      ) : (
                        <span className="text-yellow-500 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      {!doc.approved && (
                        <button
                          onClick={() => handleApproveDoctor(doc.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Regular User Management */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-purple-600">
          Regular User Management
        </h2>
        <input
          type="text"
          placeholder="Search users..."
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Post Management */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-red-600">
          User Posts Management
        </h2>
        <input
          type="text"
          placeholder="Search posts..."
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          value={postSearch}
          onChange={(e) => setPostSearch(e.target.value)}
        />
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{post.username}:</span>{" "}
                    {post.content}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
