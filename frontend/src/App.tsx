import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import CreateEventPage from './pages/CreateEventPage';
import NavigationBar from './components/NavigationBar';
import BookingPage from './pages/BookingPage';
import useAuth, { AuthProvider } from './useAuth';

function Router() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <>
          <NavigationBar />
          <Routes>
            <Route path="/book-events" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  )
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
