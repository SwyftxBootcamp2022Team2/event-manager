from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
from flask_api import status
import sqlite3 as sql
from models import db, User, Event
from sqlalchemy import create_engine, true

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///testdata.db'
db.init_app(app)
conn = sql.connect('testdata.db')

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['GET', 'POST'])
def login():
    #jsonify result from frontend
    #user = request.json['email', 'fname', 'lname']
    user = request.json
    email = user["email"]
    userinfo = db.session.query(User).filter_by(email=email).first()
    # check if email exists - if no, return error. If yes, grab first name, lastname, is admin, email and send it back in json format
    if userinfo is not None:     # check if user is in database
        # get user info from database
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname,isAdmin=userinfo.isAdmin), status.HTTP_200_OK
    else: # if not, create new user, send back a token, and add new user into the "user" db
        db.session.add(User(email=email, fname=user["fname"], lname=user["lname"], isAdmin=user["isAdmin"]))
        return "Couldn't find user!", status.HTTP_400_BAD_REQUEST

@app.route("/user/get", methods=['GET']) 
def get_user():
    user = request.json
    email = user["email"]
    userinfo = db.session.query(User).filter_by(email=email).first()
    if userinfo is not None:     # check if user is in database, and give back their info
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname,isAdmin=userinfo.isAdmin), status.HTTP_200_OK
    else: # if not, send back a token, (its a get so don't add this user into the "user" db)
        return "Couldn't find user!", status.HTTP_400_BAD_REQUEST

@app.route("/event/create", methods=['GET','POST']) # admin is the one who creates
def create_event():
    # get user data and check if user is admin
    user = request.json
    email = user["email"]
    userinfo = db.session.query(User).filter_by(email=email).first()
    if userinfo.isAdmin == 0:
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    # get event data from frontend and check that the event exists
    event = request.json
    eventID = event["eventID"]
    eventInfo = db.session.query(Event).filter_by(eventID=eventID).first()
    # if not, create new event
    if eventInfo is not None:
        return  "Event Already Exists!", status.HTTP_400_BAD_REQUEST
    else:
        # add new event into the "event" db
        db.session.add(Event(eventID=eventID, title=event["title"], location=event["location"], start=event["start"], startTime=event["startTime"], endTime=event["endTime"], participationLimit=event["participationLimit"], createdBy=event["createdBy"]))
        return "Event Created!", status.HTTP_200_OK

@app.route("/event/delete", methods=['DELETE'])
def delete_event():
    user = request.json
    email = user["email"]
    userinfo = db.session.query(User).filter_by(email=email).first()
    if userinfo.isAdmin == 0:
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    # get data from frontend
    event = request.json
    # check if event exists
    eventID = event["eventID"]
    eventInfo = db.session.query(Event).filter_by(eventID=eventID).first()
    if eventInfo is not None: # if exists, delete event
        db.session.delete(eventInfo)
    else:
        return "Event Doesn't Exist!", status.HTTP_400_BAD_REQUEST

@app.route("/event/view", methods=['GET', 'POST'])
def view_event():
    # get data from frontend
    event = request.json
    # check if event exists
    eventID = event["eventID"]
    eventInfo = db.session.query(Event).filter_by(eventID=eventID).first()
    if eventInfo is not None: # if it exists, send that mf back
        return jsonify(eventID=eventInfo.eventID, title=eventInfo.title, location=eventInfo.location, start=eventInfo.start, startTime=eventInfo.startTime, endTime=eventInfo.endTime, participationLimit=eventInfo.participationLimit, createdBy=eventInfo.createdBy), status.HTTP_200_OK
    else: # if not, send back a token
        return "Event Doesn't Exist!", status.HTTP_400_BAD_REQUEST

@app.route("/event/book", methods=['POST']) # user is the one who books
def book_event():
    return True

@app.route("/event/unbook", methods=['DELETE']) 
def unbook_event():
    return True

@app.route("/home", methods=['GET'])
def home_function():
    return True