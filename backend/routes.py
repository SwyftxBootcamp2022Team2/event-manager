from flask import Flask
import sqlite3 as sql
import app 
import requests

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['POST'])
def login():
    con = sql.connect("database.db")
    email = requests.form['email']
    con.close()

@app.route("/home", methods=['GET'])
def home_function():
    return True

@app.route("/event/create", methods=['POST']) # admin is the one who creates
def create_event():
    return True

@app.route("/event/delete", methods=['DELETE'])
def delete_event():
    return True

@app.route("/event/view", methods=['GET'])
def view_event():
    return True

@app.route("/event/book", methods=['POST']) # user is the one who books
def book_event():
    return True

@app.route("/event/unbook", methods=['DELETE']) # user is the one who books
def unbook_event():
    return True
