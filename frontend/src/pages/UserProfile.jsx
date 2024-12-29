import React, { useEffect, useState } from "react";
import api from "../api"; // Axios configured instance
const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setUserData(response.data);
        
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUserData();

  }, []);
  

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.username} {userData.id}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Role:</strong> {userData.role}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
