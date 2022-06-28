from flask import Flask
import sqlite3
from sqlite3 import Error

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def initialise_db(conn):
    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS users (\
                                        userID int AUTO_INCREMENT PRIMARY KEY
                                        email text NOT NULL,
                                        fname text NOT NULL,
                                        lname text NOT NULL, 
                                        isadmin int NOT NULL 
                                    ); """
    sql_create_events_table = """ CREATE TABLE IF NOT EXISTS events (\
                                        eventID int AUTO_INCREMENT PRIMARY KEY
                                        title text NOT NULL,
                                        location text NOT NULL,
                                        startTime datetime NOT NULL, 
                                        endTime datetime NOT NULL, 
                                        participationLimit int,
                                        createdBy int,
                                        FOREIGN KEY (eventID) REFERENCES users(userID)
                                    ); """
    sql_create_bookings_table = """ CREATE TABLE IF NOT EXISTS bookings (\
                                        bookingID int AUTO_INCREMENT PRIMARY KEY
                                        eventID int NOT NULL,
                                        userID int NOT NULL, 
                                        FOREIGN KEY (eventID) REFERENCES events(eventID),
                                        FOREIGN KEY (userID) REFERENCES users(userID)
                                    ); """
    return cur.lastrowid

def main():
    database = "backend/testdata.db"
    # create a database connection
    conn = create_connection(database)
    initialise_db(conn)
    #create_event(conn, "event")

if __name__ == '__main__':
    main()