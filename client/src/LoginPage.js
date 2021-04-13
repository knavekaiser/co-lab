import { useState, useEffect, useContext, useCallback } from "react";
import { SiteContext } from "./context/SiteContext";
import { Link, useHistory, Redirect } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const { user, setUser } = useContext(SiteContext);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ username, password: pass }),
          })
            .then((res) => res.json())
            .then(({ code, user }) => {
              if (code === "ok") {
                setUser(user);
                history.push("/");
              } else {
                alert("username/password did not match");
              }
            })
            .catch((err) => {
              alert("something went wrong");
              console.log(err);
            });
        }}
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
          required={true}
        />
        <input
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type="password"
          placeholder="password"
          required={true}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};
export default LoginPage;
