import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            window.FB.api("/me", { fields: "id,name,email" }, function (fbUserResponse) {
            const fbUserData = {
              id: fbUserResponse.id,
              name: fbUserResponse.name,
              email: fbUserResponse.email,
            };
  
            window.FB.api(`/${fbUserResponse.id}/picture?type=large`, function (
              fbPictureResponse
            ) {
              fbUserData.profilePictureUrl = fbPictureResponse.data.url;
  
              setUser(fbUserData);
              setIsAuthenticated(true);
              setLoading(false);
            });
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, []);  

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);

    Cookies.set("token", token, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
