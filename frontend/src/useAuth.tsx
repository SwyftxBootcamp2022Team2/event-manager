import React, { ReactNode, useState, createContext, useEffect, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"

interface User {
  email: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
}

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
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true)

  const navigate = useNavigate();
  const location = useLocation();

  // reset errors on page change
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);


  // check current active session on first mount
  useEffect(() => {
    // TODO: post to getUser
  }, []);

  function login(email: string) {
    setLoading(true);

    // TODO: post to login 
  }

  function logout() {
    // TODO: post to logout
  }

  // provider should update only when required
  const memoizedValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    logout,
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};


export default function useAuth() {
  return useContext(AuthContext);
}
