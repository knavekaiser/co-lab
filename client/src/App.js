import { useState, useEffect, useRef, useContext } from "react";
import { SiteContext } from "./context/SiteContext";
import "./App.scss";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Register from "./RegisterPage";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function resizeWindow() {
  let vh = window.innerHeight * 0.01;
  document.body.style.setProperty("--vh", `${vh}px`);
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(SiteContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  useEffect(() => {
    window.addEventListener("resize", () => resizeWindow());
    resizeWindow();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/">
          <LandingPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
