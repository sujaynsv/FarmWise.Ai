import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await fetch(`http://localhost:5000/profile?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Profile</h2>

        {user ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">Name:</strong> {user.name}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">Date of Birth:</strong> {user.dob}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">City:</strong> {user.city}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">State:</strong> {user.state}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">Phone:</strong> {user.phone}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-gray-900">Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            <p className="text-lg text-gray-500 ml-2">Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;