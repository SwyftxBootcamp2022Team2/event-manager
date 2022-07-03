import http
from sqlalchemy.orm import Session
from sqlalchemy import select, update
from datetime import datetime
from flask import Flask, jsonify, request
from flask_api import status
import sqlite3 as sql
from models import Bookings, User, Event, engine
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.exc import MultipleResultsFound
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



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
            return jsonify(
                email=userinfo.email, 
                fname=userinfo.fname, 
                lname=userinfo.lname, 
                isAdmin=userinfo.isAdmin,
                department=userinfo.department,
                dietary=userinfo.dietary,
                accessibility=userinfo.accessibility), status.HTTP_200_OK
    # if not, send back a token, (its a get so don't add this user into the "user" db)
    return "Couldn't find user!", status.HTTP_404_NOT_FOUND

@app.route("/user/update", methods=['PATCH'])
@cross_origin()
def update_user():
    print_db(User)
    user = request.json
    email = user["email"]
    fName = user["fName"]
    lName = user["lName"]
    department = user["department"]
    dietary = user["dietary"]
    accessibility = user["accessibility"]
    with Session(engine) as session:
        try:
            
            session.execute(
                update(User)
                .where(User.email==email)
                .values(
                    fname = fName,
                    lname = lName,
                    department = department,
                    dietary = dietary,
                    accessibility = accessibility)
            ) 
            session.commit()

        except Exception as e:
            print(e)
            return "Error updating user information", status.HTTP_400_BAD_REQUEST

    print_db(User)
    return "User information successfully updated", status.HTTP_200_OK


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
                email=createdBy,
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


@app.route("/event/view", methods=['GET'])
@cross_origin()
def view_event():
    # get data from frontend
    eventID = request.args["eventID"]

    with Session(engine) as session:
        eventInfo = session.query(Event).filter_by(eventID=eventID).first()
        print(eventInfo)
    if eventInfo is not None:  # if it exists, send that mf back
        return jsonify(eventID=eventInfo.eventID, email=eventInfo.email, title=eventInfo.title, description=eventInfo.description, location=eventInfo.location, startTime=eventInfo.startTime, endTime=eventInfo.endTime, participationLimit=eventInfo.participationLimit, publishTime=eventInfo.publishTime), status.HTTP_200_OK
    # if not, send back a token
    return jsonify(error="Event Doesn't Exist!"), status.HTTP_400_BAD_REQUEST

@app.route("/event/bookings/count", methods=['GET'])
@cross_origin()
def get_bookings_count():
    # get data from frontend
    eventID = request.args["eventID"]

    with Session(engine) as session:
        eventInfo = session.query(Bookings).filter_by(eventID=eventID).count()
        return jsonify(count=eventInfo), status.HTTP_200_OK

@app.route("/event/get", methods=['GET'])
@cross_origin()
def get_events():
    with Session(engine) as session:
        query = session.query(Event).all()
        events = []
        for q in query:
            temp = {'eventID':q.eventID, 'title':q.title, 'description':q.description, 'location': q.location, 'startTime': q.startTime, 'endTime': q.endTime, 'participationLimit': q.participationLimit, 'email': q.email, 'publishTime': q.publishTime}
            events.append(temp)
        # remove strings from each event in array
        return jsonify(eventData=events), status.HTTP_200_OK #jsonify(events=events), status.HTTP_200_OK

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
    with Session(engine) as session:
            # find all events associated with email
            query = session.query(Bookings, Event).join(Event, Event.eventID == Bookings.eventID).filter(Bookings.email == email).all()
            events = []
            for q in query:
                temp = {'title': q.Event.title, 'location': q.Event.location, 'startTime': q.Event.startTime, 'endTime': q.Event.endTime, 'participationLimit': q.Event.participationLimit, 'email': email}
                events.append(temp)
            # remove strings from each event in array
            return jsonify(events), status.HTTP_200_OK

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
