import sqlite3

database = "testdata.db"

connection = sqlite3.connect(database)

with open('schema.sql') as f:
    connection.executescript(f.read())

connection.commit()
connection.close()