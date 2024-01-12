import { useState } from "react";

const SignUpForm = ({ setToken }) => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

async function handleSubmit (event) {
    event.preventDefault();

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
        });
        const result = await response.json();
        setToken(result.token);
        console.log(result);
    } catch (error) {
    setError(error.message);
    }
}

return (
<>
<h2>Sign Up!</h2>
{error && <p>{error}</p>}
<form id="form" onSubmit={handleSubmit}>
    <label>username: 
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    < br/>
    <label>password: 
        <input value={password} onChange={(e) => setPassword(e.target.value)} minLength={8}  />
    </label>
    < br/>
    <button id="button" type="submit">Submit</button>
</form>
</>
);
};

export default SignUpForm;