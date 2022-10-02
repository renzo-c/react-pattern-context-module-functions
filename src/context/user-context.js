import React from "react";
import * as userClient from "../user-client";
import { useAuth } from "../auth-context";

const UserContext = React.createContext();

const initialState = (user) => ({
  status: null,
  error: null,
  storedUser: user,
  user
});

UserContext.displayName = "UserContext";

const userReducer = (state, action) => {
  switch (action.type) {
    case "start update": {
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        status: "...pending",
        storedUser: state.user
      };
    }
    case "finish update": {
      console.log({ action });
      return {
        ...state,
        user: action.updatedUser,
        status: "resolved",
        storedUser: null,
        error: null
      };
    }
    case "fail update": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
        user: state.storedUser,
        storedUser: null
      };
    }
    case "reset": {
      return {
        ...state,
        status: null,
        error: null
      };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
};

function UserProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = React.useReducer(userReducer, initialState(user));
  const value = [state, dispatch];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

async function updateUser(dispatch, user, updates) {
  console.log({ dispatch, user, updates });
  dispatch({ type: "start update", updates });
  try {
    const updatedUser = await userClient.updateUser(user, updates);
    dispatch({ type: "finish update", updatedUser });
  } catch (error) {
    dispatch({ type: "fail update", error });
    throw error;
  }
}

export { UserProvider, useUser, updateUser };
