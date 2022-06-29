from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
from flask_api import status
import sqlite3 as sql
from models import db, User
from sqlalchemy import create_engine, true

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///testdata.db'
db.init_app(app)
conn = sql.connect('testdata.db')

@app.route("/")
def hello():
    return "Hello, World!"

# @app.route("/login", methods=['GET'])
# def login():
#     #jsonify result from frontend
#     # user = request.json['email', 'fname', 'lname']

#     user = request.json
#     email = user["email"]

#     userinfo = db.session.query(User).filter_by(email=email).first()
#     # get user info from database
#     return jsonify(fname=userinfo.fname, lname=userinfo.lname,isAdmin=userinfo.isAdmin)
#     if result is not None:     # check if user is in database
#         return jsonify(result.__dict__) #return exists["isAdmin"] #role, isadmin, smth else # if exists, send back a token
#     else: # if not, create new user, send back a token
#         #db.session.add(user)
#         return "Couldn't find user!", status.HTTP_400_BAD_REQUEST

@app.route("/login", methods=['GET'])
def login():
    #jsonify result from frontend
    # user = request.json['email', 'fname', 'lname']
    user = request.json
    email = user["email"]
    userinfo = db.session.query(User).filter_by(email=email).first()
    # check if email exists - if no, return error. If yes, grab first name, lastname, is admin, email and send it back in jsoon format
    if userinfo is not None:     # check if user is in database
        # get user info from database
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname,isAdmin=userinfo.isAdmin)
        #return True #return exists["isAdmin"] #role, isadmin, smth else # if exists, send back a token
    else: # if not, create new user, send back a token
        #db.session.add(user)
        return "Couldn't find user!", status.HTTP_400_BAD_REQUEST



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
