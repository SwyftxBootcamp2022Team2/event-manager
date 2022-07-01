import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

  const authorisedRoutes = (
    <>
      <NavigationBar />
      <Routes>
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

  return user === null ? (
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