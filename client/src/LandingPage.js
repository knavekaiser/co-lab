import { useContext } from "react";
import { SiteContext } from "./context/SiteContext";
import { Link, useHistory } from "react-router-dom";

const LandingPage = () => {
  const { setUser } = useContext(SiteContext);
  const history = useHistory();
  return (
    <div>
      <h1>Landing Page</h1>
      <p>logged in</p>
      <button
        onClick={() => {
          console.log("loging out");
          fetch("/api/logout")
            .then((res) => res.json())
            .then(({ user, success }) => {
              if (success) {
                setUser(user);
                history.push("/login");
              }
            });
        }}
      >
        logout
      </button>
    </div>
  );
};
export default LandingPage;
