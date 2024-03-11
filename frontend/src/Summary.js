// Filename: Summary.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Summary() {
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalCost = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        const response = await fetch(
          "http://18.169.24.172:8000/api/products/total",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTotalCost(data.total_cost);
      }
    };
    fetchTotalCost();
  }, []);

  return (
    <div>
      <h1>Total Cost: £{totalCost}</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default Summary;
