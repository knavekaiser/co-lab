import { createContext, useState, useEffect, useCallback } from "react";

export const SiteContext = createContext();
export const SiteContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const seeIfLoggedIn = useCallback(() => {
    fetch("/api/authUser")
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "ok") {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log("not logged in");
      });
  }, []);
  useEffect(seeIfLoggedIn, []);
  return (
    <SiteContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
