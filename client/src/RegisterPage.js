import { useState, useContext } from "react";
import { SiteContext } from "./context/SiteContext";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(SiteContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, username, email, pass }),
          })
            .then((res) => res.json())
            .then(({ code, user, field }) => {
              if (code === "ok") {
                setUser(user);
                history.push("/");
              } else if (code === 11000) {
                alert(`${field} exists`);
              } else {
                alert("something went wrong");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("something went wrong");
            });
        }}
        autoComplete="off"
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
          required={true}
          autoComplete="off"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="name"
          required={true}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="email"
          required={true}
        />
        <input
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type="password"
          placeholder="password"
          required={true}
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
