from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from flask import Flask, jsonify, request
from flask_api import status
import sqlite3 as sql
from models import Bookings, User, Event, engine
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.exc import MultipleResultsFound
from flask_cors import CORS, cross_origin
from flask import g 
import json 

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///testdata.db'
# db.init_app(app)
# conn = sql.connect('testdata.db')


@app.route("/")
@cross_origin()
def hello():
    return "Hello, World!"


# login takes user email, check database
@app.route("/login", methods=['POST'])
@cross_origin()
def login():
    user = request.json
    email = user["email"]  # always check email
    with Session(engine) as session:
        userinfo = session.query(User).filter_by(email=email).first()
    if userinfo is not None:  # email exists in db, so send back user data
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname, isAdmin=userinfo.isAdmin), status.HTTP_200_OK
    return jsonify(error="User not found"), status.HTTP_404_NOT_FOUND


# login takes user email, check database
@app.route("/signup", methods=['POST'])
@cross_origin()
def signup():
    user = request.json
    email = user["email"]  # always check email
    fname = user["fname"]
    lname = user["lname"]
    isAdmin = user["isAdmin"]
    # check if email exists - if not, create new user
    with Session(engine) as session:
        userinfo = session.query(User).filter_by(email=email).first()
    if userinfo is not None:  # email exists in db, so send back user data
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname, isAdmin=userinfo.isAdmin), status.HTTP_200_OK
    else:  # user doesn't exist, so add to db
        with Session(engine) as session:
            user = User(
                email=email,
                fname=fname,
                lname=lname,
                isAdmin=isAdmin
            )
            session.add(user)
            session.commit()
        return jsonify(error="User not found"), status.HTTP_404_NOT_FOUND


@app.route("/user/get", methods=['GET'])
@cross_origin()
def get_user():
    user = request.json
    email = user["email"]
    with Session(engine) as session:
        userinfo = session.query(User).filter_by(email=email).first()
    if userinfo is not None:     # check if user is in database, and give back their info
        return jsonify(email=userinfo.email, fName=userinfo.fname, lName=userinfo.lname, isAdmin=userinfo.isAdmin), status.HTTP_200_OK
    # if not, send back a token, (its a get so don't add this user into the "user" db)
    return "Couldn't find user!", status.HTTP_400_BAD_REQUEST


@app.route("/event/create", methods=['GET', 'POST'])
@cross_origin()
def create_event():
    # get user data
    eventInfo = request.json
    createdBy = eventInfo["createdBy"]
    eventTitle = eventInfo["eventTitle"]
    location = eventInfo["location"]
    startTime = eventInfo["startTime"]
    endTime = eventInfo["endTime"]
    partLimit = eventInfo["participationLimit"]
    publishTime = eventInfo["publishTime"]

    # check if the user is an admin
    if (not isAdmin(createdBy)):
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    # otherwise, allow event creation
    try:
        with Session(engine) as session:
            event = Event(
                createdBy=createdBy,
                title=eventTitle,
                location=location,
                startTime=datetime.strptime(startTime, "%d-%m-%Y %H:%M:%S"),
                endTime=datetime.strptime(endTime, "%d-%m-%Y %H:%M:%S"),
                participationLimit=partLimit,
                publishTime=datetime.strptime(publishTime, "%d-%m-%Y %H:%M:%S")
            )
            session.add(event)
            session.commit()
        return "Event successfully created", status.HTTP_201_CREATED
    except Exception as e:
        print(e)

        return "Error occurred when creating an event", status.HTTP_400_BAD_REQUEST


@app.route("/event/delete", methods=['DELETE'])
@cross_origin()
def delete_event():
    # theres 2 jsons so two reads are happening, but depending on how the packet looks
    # we can just do one read and split it into user and event
    user = request.json

    # check if the user is an admin
    if (not isAdmin(user)):
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    event = request.json  # check if event exists
    eventID = event["eventID"]
    try:
        with Session(engine) as session:
            event = session.get(Event, eventID)
            session.delete(event)
            session.commit()
            return "Event successfully deleted", status.HTTP_200_OK
    except:
        return "Error occured when deleting event, please try again later", status.HTTP_400_BAD_REQUEST


@app.route("/event/view", methods=['GET', 'POST'])
@cross_origin()
def view_event():
    # get data from frontend
    event = request.json
    # check if event exists
    eventID = event["eventID"]
    with Session(engine) as session:
        eventInfo = session.query(Event).filter_by(eventID=eventID).first()
    if eventInfo is not None:  # if it exists, send that mf back
        return jsonify(eventID=eventInfo.eventID, title=eventInfo.title, location=eventInfo.location, start=eventInfo.start, startTime=eventInfo.startTime, endTime=eventInfo.endTime, participationLimit=eventInfo.participationLimit, createdBy=eventInfo.createdBy), status.HTTP_200_OK
    # if not, send back a token
    return "Event Doesn't Exist!", status.HTTP_400_BAD_REQUEST


@app.route("/bookings/create", methods=['POST'])  # user is the one who books
@cross_origin()
def book_event():
    bookingInfo = request.json
    eventID = bookingInfo["eventID"]
    email = bookingInfo["email"]

    try:
        with Session(engine) as session:
            newBooking = Bookings(
                eventID=eventID,
                email=email
            )
            # get number of bookings that are left to do
            numBookings = session.query(
                Bookings).filter_by(eventID=eventID).count()
            # check if the participation limit has been exceed
            event = session.query(Event).filter_by(email=email).first()
            if numBookings + 1 >= event.participationLimit:
                return "Participation limit exceeded", status.HTTP_400_BAD_REQUEST
            session.add(newBooking)
            session.commit()

        print_db(Bookings)
        return "Booking succesful!", status.HTTP_200_OK
    except:
        return "An error occured when booking, please try again later", status.HTTP_400_BAD_REQUEST


@app.route("/bookings/delete", methods=['DELETE'])
@cross_origin()
def unbook_event():
    bookingInfo = request.json
    eventID = bookingInfo["eventID"]  # eventID to delete

    try:
        with Session(engine) as session:
            booking = session.get(Bookings, eventID)
            session.delete(booking)
            session.commit()

        return "Event successfully unbooked", status.HTTP_200_OK
    except:
        return "Error occured when unbooking, please try again later", status.HTTP_400_BAD_REQUEST


@app.route("/bookings/mybookings", methods=['GET'])
@cross_origin()
def all_bookings():
    # give email as the foreign key for the bookings
    # give all the events that have my email
    userinfo = request.json
    email = userinfo["email"]
    print("email", email)
    with Session(engine) as session:
            # find all events associated with email
            #events = session.query(Event)

            query = session.query(Bookings, Event).join(Event, Event.eventID == Bookings.eventID).all()
            events = []
            for q in query:
                if q.Bookings.email == email:
                    temp = json.dumps({'title': q.Event.title, 'location': q.Event.location, 'startTime': q.Event.startTime, 'endTime': q.Event.endTime, 'participationLimit': q.Event.participationLimit, 'email': email})
                    events.append(temp)
            print(events)
            return jsonify(events), status.HTTP_200_OK

    return "Booking", status.HTTP_200_OK

@app.route("/", methods=['GET'])
def home_function():
    return True

#### HELPER FUNCTION ####


def print_db(modelName):
    with engine.connect() as conn:
        stmt = select(modelName)
        for row in conn.execute(stmt):
            print(row)


def isAdmin(email):
    try:
        with Session(engine) as session:
            user = session.get(User, email)
    except MultipleResultsFound:
        return "Multiple users with this email found", status.HTTP_400_BAD_REQUEST

    except NoResultFound:
        return "No user with associated email found", status.HTTP_400_BAD_REQUEST

    return user.isAdmin == 1
