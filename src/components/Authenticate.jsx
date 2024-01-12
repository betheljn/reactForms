import { useState, useEffect } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loggedInUsername, setLoggedInUsername] = useState("");
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setSuccessMessage(result.message);

        const {username} = result.data || {};
          if (username) {
            setLoggedInUsername(username);
          }
      } catch (error) {
        setError(error.message);
      }
    }
    useEffect(() => {
        handleClick();
    },[]);
    return (
      <div>
        <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
                
      <div>
        {loggedInUsername && (
            <p>Welcome Back, {loggedInUsername}!</p>
        )}
      </div>
    </div>
    );
}
