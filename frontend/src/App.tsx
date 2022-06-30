import * as React from 'react';
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/book-events" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
