import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
        navigate("/dashboard");
    }

  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);

      try {

        const profileRes = await API.get(`/profile/${res.data.userId}`);

        if (profileRes.data) {
            navigate("/dashboard");
        } else {
            navigate("/assessment");
        }

        } catch {
        navigate("/assessment");
        }

    } catch (error) {

      alert("Login failed");

    }

  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Login</button>

      </form>

    </div>
  );

}

export default LoginPage;