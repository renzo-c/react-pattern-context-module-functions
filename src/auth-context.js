import * as React from "react";

const AuthContext = React.createContext({
  user: { username: "renzo", tagline: "", bio: "" }
});

AuthContext.displayName = "AuthContext";

const AuthProvider = ({ user, ...props }) => (
  <AuthContext.Provider value={user} {...props} />
);

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
