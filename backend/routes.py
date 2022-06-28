from flask import Flask, request
import sqlite3 as sql

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['POST'])
def login():
    con = sql.connect("database.db")
    email = requests.form['email']
    con.close()

    