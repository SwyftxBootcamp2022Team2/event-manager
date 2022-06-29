from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
import sqlite3 as sql
from models import db

app = Flask(__name__)
db.init_app(app)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['POST', 'GET'])
def login():
    #jsonify result from frontend
    user = request.json['email', 'fname', 'lname', 'isAdmin']
    email = user["email"]
    exists = db.session.query(User.email).filter_by(email=email).first() is not None
    if exists:     # check if user is in database
        return email #role, isadmin, smth else # if exists, send back a token
    else: # if not, create new user, send back a token
        #db.session.add(user)
        raise Exception("Couldn't find user", 400)
    return "this works!"


@app.route("/user/get", methods=['GET']) 
def get_user():
    # data = [{'userId': 1, 'email': ', ]
    # check if userId is in database
    
    # get user should give an email and isAdmin
    return True

    
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






