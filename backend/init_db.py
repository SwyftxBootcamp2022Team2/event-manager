import sqlite3

database = "testdata.db"

connection = sqlite3.connect(database)

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()
cur.execute("SELECT * FROM users")
rows = cur.fetchall()
for row in rows:
    print(row)

connection.commit()
connection.close()