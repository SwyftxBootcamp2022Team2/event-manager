-- Drop tables if they exist
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `bookings`;
-- Create tables
CREATE TABLE IF NOT EXISTS `users` (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    email text NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    department text NOT NULL,
    dietary text,
    accessibility text,
    isAdmin INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS `events` (
    eventID INTEGER PRIMARY KEY AUTOINCREMENT,
    title text NOT NULL,
    location text NOT NULL,
    startTime text NOT NULL,
    endTime text NOT NULL,
    participationLimit int,
    email text,
    publishTime text,
    FOREIGN KEY (eventID) REFERENCES users(userID)
);
CREATE TABLE IF NOT EXISTS `bookings` (
    bookingID INTEGER PRIMARY KEY AUTOINCREMENT,
    eventID INTEGER NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (eventID) REFERENCES events(eventID),
    FOREIGN KEY (email) REFERENCES users(email)
);
-- Insert test users
INSERT INTO `users` (`email`, `fname`, `lname`, `department`, `dietary`, `accessibility`, `isAdmin`) VALUES ('admin@gmail.com', 'Admin', 'User', 'P & C', null, null, 1);
INSERT INTO `users` (`email`, `fname`, `lname`, `department`, `dietary`, `accessibility`, `isAdmin`) VALUES ('user@gmail.com', 'Normal', 'User', 'R & D', 'halal', 'wheelchair', 0);
INSERT INTO `users` (`email`, `fname`, `lname`, `department`, `dietary`, `accessibility`, `isAdmin`) VALUES ('test@gmail.com', 'Test', 'User', 'R & D', 'vegetarian', null, 1);
-- Insert test events
INSERT INTO `events` (`title`, `location`, `startTime`, `endTime`, `participationLimit`, `email`, `publishTime`) VALUES ('Sunday Funday', 'Himath''s room', '2020-01-02 00:00:00', '2020-01-02 00:00:00', 7, 1, '2020-01-02 00:00:00');
INSERT INTO `events` (`title`, `location`, `startTime`, `endTime`, `participationLimit`, `email`, `publishTime`) VALUES ('Pancake Wednesday', 'Swytfx HQ', '2020-01-02 00:00:00', '2020-01-02 00:00:00', 7, 1, '2020-01-02 00:00:00');
INSERT INTO `events` (`title`, `location`, `startTime`, `endTime`, `participationLimit`, `email`, `publishTime`) VALUES ('Saturday VR', 'VR Place', '2020-01-02 00:00:00', '2020-01-02 00:00:00', 5, 3, '2020-01-02 00:00:00');
-- Insert test bookings
INSERT INTO `bookings` (`eventID`, `email`) VALUES (1, "admin@gmail.com");
INSERT INTO `bookings` (`eventID`, `email`) VALUES (3, "admin@gmail.com");
INSERT INTO `bookings` (`eventID`, `email`) VALUES (2, "user@gmail.com");