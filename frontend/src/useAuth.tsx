import React, { ReactNode, useState, createContext, useEffect, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { User } from "./types/user"
import * as sessionsApi from "./api/sessions";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false)

  // const navigate = useNavigate();
  // const location = useLocation();

  // reset errors on page change
  // useEffect(() => {
  //   if (error) setError(null);
  // }, [location.pathname]);


  // check current active session on first mount
  useEffect(() => {
    // TODO: post to getUser
  }, []);

  async function login(email: string) {
    setLoading(true);
    sessionsApi.login(email).then((user) => {
      setUser(user);
      // navigate("/calendar");
    })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    // TODO: post to logout
  }

  // provider should update only when required
  const memoizedValue = {
    user,
    loading,
    error,
    login,
    logout,
  }

  sessionsApi.login("hello@test.com")

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};


export default function useAuth() {
  return useContext(AuthContext);
}
