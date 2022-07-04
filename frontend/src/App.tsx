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
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import CreateEventPage from './pages/CreateEventPage';
import NavigationBar from './components/NavigationBar';
import BookEventsPage from './pages/BookEventsPage';
import useAuth, { AuthProvider } from './useAuth';
import theme from './theme';
import BookEventModal from './components/BookEventModal';

function Router() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(-2);
    }
    console.log('hello');
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
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </>
  );

  if (user === undefined) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  return authorisedRoutes;
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
