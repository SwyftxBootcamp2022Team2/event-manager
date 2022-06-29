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

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['GET'])
def login():
    #jsonify result from frontend
    # user = request.json['email', 'fname', 'lname']

    user = request.json
    email = user["email"]

    exists = db.session.query(User, User.isAdmin).first()
    dict = row2dict(exists)
    if exists is not None:     # check if user is in database
        return dict["isAdmin"] #return exists["isAdmin"] #role, isadmin, smth else # if exists, send back a token
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
