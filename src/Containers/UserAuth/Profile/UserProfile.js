import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Components/Offers/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`https://lawyerappwebapi.azurewebsites.net/api/Users/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data); 
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>ID: {userData.id}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <button >Go to Profile</button>
    </div>
  );
};

export default UserProfile;