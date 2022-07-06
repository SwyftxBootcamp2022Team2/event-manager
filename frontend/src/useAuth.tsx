import React, {
  ReactNode,
  useState,
  createContext,
  useMemo,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './types/types'
import * as sessionsApi from './api/sessions';

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;

  // eslint-disable-next-line no-unused-vars
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

  const navigate = useNavigate();

  async function login(email: string) {
    setLoading(true);
    sessionsApi
      .login(email)
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(undefined); // clear user
    navigate('/login'); // redirect to login page
  }

  // provider should update only when required
  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, login, logout],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
