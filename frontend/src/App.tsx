import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import CreateEventPage from './pages/CreateEventPage';
import NavigationBar from './components/NavigationBar';
import BookEventsPage from './pages/BookEventsPage';
import useAuth, { AuthProvider } from './useAuth';
import theme from './theme';
import BookEventModal from './components/BookEventModal';
import Admin from './components/permissions/Admin';
import ReportingPage from './pages/ReportingPage';

function Router() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(-2);
    }
  }, [user]);

  const authorisedRoutes = (
    <>
      <NavigationBar />
      <Routes>
        <Route path="*" element={<Navigate to="/book-events" replace />} />
        <Route path="/book-events" element={<BookEventsPage />}>
          <Route path=":id" element={<BookEventModal />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        {/* Admin Routes */}
        <Route
          path="/create-event"
          element={
            <Admin>
              <CreateEventPage />
            </Admin>
          }
        />
        <Route
          path="/reporting"
          element={
            <Admin>
              <ReportingPage />
            </Admin>
          }
        />
      </Routes>
    </>
  );

  return user ? (
    authorisedRoutes
  ) : (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
