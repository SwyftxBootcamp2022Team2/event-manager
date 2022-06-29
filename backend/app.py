from flask import Flask
import sqlite3
from sqlite3 import Error

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World! yay"

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

def reset_db(conn):
    c = conn.cursor()
    c.execute('''DROP TABLE IF EXISTS users''')
    c.execute('''DROP TABLE IF EXISTS events''')
    c.execute('''DROP TABLE IF EXISTS bookings''')
    conn.commit()

def initialise_db(conn):
    c = conn.cursor()
    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS users (\
                                        userID INTEGER PRIMARY KEY AUTOINCREMENT,
                                        email text NOT NULL,
                                        fname text NOT NULL,
                                        lname text NOT NULL, 
                                        isAdmin INTEGER NOT NULL 
                                    ); """
    sql_create_events_table = """ CREATE TABLE IF NOT EXISTS events (\
                                        eventID INTEGER PRIMARY KEY AUTOINCREMENT,
                                        title text NOT NULL,
                                        location text NOT NULL,
                                        startTime datetime NOT NULL, 
                                        endTime datetime NOT NULL, 
                                        participationLimit int,
                                        createdBy INTEGER,
                                        FOREIGN KEY (eventID) REFERENCES users(userID)
                                    ); """
    sql_create_bookings_table = """ CREATE TABLE IF NOT EXISTS bookings (\
                                        bookingID INTEGER PRIMARY KEY AUTOINCREMENT,
                                        eventID INTEGER NOT NULL,
                                        userID INTEGER NOT NULL,
                                        findmeeeee, 
                                        FOREIGN KEY (eventID) REFERENCES events(eventID),
                                        FOREIGN KEY (userID) REFERENCES users(userID)
                                    ); """

    c.execute(sql_create_user_table)
    c.execute(sql_create_events_table)
    c.execute(sql_create_bookings_table)

    conn.commit()

def get_all(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    for row in rows:
        print(row)

def add_user(conn, userDetails):
    
    sql = ''' INSERT INTO users (email, fname, lname, isAdmin) VALUES (?, ?, ?, ?) '''
    cur = conn.cursor()
    cur.execute(sql, userDetails)
    conn.commit()
    return cur.lastrowid

def main():
    database = "testdata.db"
    # create a database connection
    conn = create_connection(database)

    # delete pre-existing tables
    reset_db(conn)

    # create tables
    initialise_db(conn)

    adminDetails = ('admin@gmail.com', 'Admin', 'User', 1)
    userDetails = ('user@gmail.com', 'Normal', 'User', 0)
    
    add_user(conn, adminDetails)
    add_user(conn, userDetails)
    
    get_all(conn)

if __name__ == '__main__':
    main()