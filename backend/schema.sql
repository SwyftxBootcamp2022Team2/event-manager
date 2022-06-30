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
    startTime datetime NOT NULL,
    endTime datatime NOT NULL,
    participationLimit int,
    createdBy INTEGER,
    publishTime datetime,
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

