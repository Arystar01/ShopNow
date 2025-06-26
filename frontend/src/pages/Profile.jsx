import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  if (!user) return <div className="p-4 text-gray-600">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h2>
      <div className="space-y-4 text-gray-700">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        )}
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
        <p><strong>Address:</strong> {user.address?.street || "Not provided"}</p>
        <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
        <p><strong>Blocked:</strong> {user.isBlocked ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default Profile;
