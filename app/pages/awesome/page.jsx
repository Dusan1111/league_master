// pages/awesome/page.jsx
"use client";

import React, { useEffect, useState } from "react";

const AwesomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("api/companies", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="card-list">
      <h3>Hello world!</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AwesomePage;
