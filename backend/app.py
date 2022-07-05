from sqlalchemy.orm import Session
from sqlalchemy import select, update
from datetime import datetime
from flask import Flask, jsonify, request, Response
from flask_api import status
import sqlite3 as sql
from models import Bookings, User, Event, engine
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.exc import MultipleResultsFound
from flask_cors import CORS, cross_origin
from icalendar import Calendar, vCalAddress, vText
from icalendar import Event as icalEvent
import requests
import json
import io
import csv
import os

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
webhook = (
    "https://hooks.slack.com/services/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"
)
# slack_webhook = os.environ.get('SLACK_WEBHOOK_URL')


@app.route("/")
@cross_origin()
def hello():
    return "Hello, World!"


# login takes user email, check database
@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    user = request.json
    email = user["email"]  # always check email
    with Session(engine) as session:
        userinfo = session.query(User).filter_by(email=email).first()
    if userinfo is not None:  # email exists in db, so send back user data
        return (
            jsonify(
                email=userinfo.email,
                fName=userinfo.fname,
                lName=userinfo.lname,
                isAdmin=userinfo.isAdmin,
            ),
            status.HTTP_200_OK,
        )
    return jsonify(error="User not found"), status.HTTP_404_NOT_FOUND


# login takes user email, check database
@app.route("/signup", methods=["POST"])
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
        return (
            jsonify(
                email=userinfo.email,
                fName=userinfo.fname,
                lName=userinfo.lname,
                isAdmin=userinfo.isAdmin,
            ),
            status.HTTP_200_OK,
        )
    else:  # user doesn't exist, so add to db
        with Session(engine) as session:
            user = User(email=email, fname=fname, lname=lname, isAdmin=isAdmin)
            session.add(user)
            session.commit()
        return jsonify(error="User not found"), status.HTTP_404_NOT_FOUND


@app.route("/user/get", methods=["GET"])
@cross_origin()
def get_user():
    user = request.json
    email = user["email"]
    with Session(engine) as session:
        userinfo = session.query(User).filter_by(email=email).first()
        if (
            userinfo is not None
        ):  # check if user is in database, and give back their info
            return (
                jsonify(
                    email=userinfo.email,
                    fname=userinfo.fname,
                    lname=userinfo.lname,
                    isAdmin=userinfo.isAdmin,
                    department=userinfo.department,
                    dietary=userinfo.dietary,
                    accessibility=userinfo.accessibility,
                ),
                status.HTTP_200_OK,
            )
    # if not, send back a token, (its a get so don't add this user into the "user" db)
    return "Couldn't find user!", status.HTTP_404_NOT_FOUND


@app.route("/user/update", methods=["PATCH"])
@cross_origin()
def update_user():
    user = request.json
    email = user["email"]
    fName = user["fname"]
    lName = user["lname"]
    department = user["department"]
    dietary = user["dietary"]
    accessibility = user["accessibility"]
    with Session(engine) as session:
        try:

            session.execute(
                update(User)
                .where(User.email == email)
                .values(
                    fname=fName,
                    lname=lName,
                    department=department,
                    dietary=dietary,
                    accessibility=accessibility,
                )
            )
            session.commit()

        except Exception as e:
            print(e)
            return "Error updating user information", status.HTTP_400_BAD_REQUEST

    return "User information successfully updated", status.HTTP_200_OK


@app.route("/event/create", methods=["GET", "POST"])
@cross_origin()
def create_event():
    # get user data
    eventInfo = request.json
    email = eventInfo["email"]
    eventTitle = eventInfo["title"]
    location = eventInfo["location"]
    startTime = eventInfo["startTime"]
    endTime = eventInfo["endTime"]
    partLimit = eventInfo["participationLimit"]
    description = eventInfo["description"]
    # convert string to datetime for startTime
    startTime = datetime.strptime(startTime, "%Y-%m-%d %H:%M")
    month = startTime.strftime("%B")
    day = startTime.strftime("%d")
    hour = startTime.strftime("%H")

    # check if the user is an admin
    if not isAdmin(email):
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    # otherwise, allow event creation
    try:
        with Session(engine) as session:
            event = Event(
                email=email,
                title=eventTitle,
                location=location,
                startTime=startTime,
                endTime=endTime,
                participationLimit=partLimit,
                description=description,
            )
            session.add(event)
            session.commit()
            payload = {
                "text": eventTitle
                + " is on at "
                + location
                + "! :tada: RSVP on SwyftSocial if you can make it :heart: It starts on "
                + str(month)
                + " "
                + str(day)
                + " at "
                + str(hour)
                + ":00!"
            }
            send_slack_message(payload)
        return "Event successfully created", status.HTTP_201_CREATED
    except Exception as e:
        print(e)

        return "Error occurred when creating an event", status.HTTP_400_BAD_REQUEST


@app.route("/event/delete", methods=["DELETE"])
@cross_origin()
def delete_event():
    # theres 2 jsons so two reads are happening, but depending on how the packet looks
    # we can just do one read and split it into user and event
    user = request.json
    # check if the user is an admin
    if not isAdmin(user):
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    event = request.json  # check if event exists
    eventID = event["eventID"]
    try:
        with Session(engine) as session:
            event = session.get(Event, eventID)
            session.delete(event)
            session.commit()
            payload = {"text": event["title"] + " has been deleted :pensive:"}
            send_slack_message(payload)
            return "Event successfully deleted", status.HTTP_200_OK
    except:
        return (
            "Error occured when deleting event, please try again later",
            status.HTTP_400_BAD_REQUEST,
        )


@app.route("/event/view", methods=["GET", "POST"])
@cross_origin()
def view_event():
    # get data from frontend
    event = request.json
    # check if event exists
    eventID = event["eventID"]
    with Session(engine) as session:
        eventInfo = session.query(Event).filter_by(eventID=eventID).first()
    if eventInfo is not None:  # if it exists, send that mf back
        return (
            jsonify(
                eventID=eventInfo.eventID,
                title=eventInfo.title,
                location=eventInfo.location,
                startTime=eventInfo.startTime,
                endTime=eventInfo.endTime,
                participationLimit=eventInfo.participationLimit,
                createdBy=eventInfo.createdBy,
            ),
            status.HTTP_200_OK,
        )
    # if not, send back a token
    return "Event Doesn't Exist!", status.HTTP_400_BAD_REQUEST


@app.route("/bookings/create", methods=["POST"])  # user is the one who books
@cross_origin()
def book_event():
    bookingInfo = request.json
    eventID = bookingInfo["eventID"]
    email = bookingInfo["email"]

    try:
        with Session(engine) as session:
            newBooking = Bookings(eventID=eventID, email=email)
            # get number of bookings that are left to do
            numBookings = session.query(Bookings).filter_by(eventID=eventID).count()
            # check if the participation limit has been exceed
            event = session.query(Event).filter_by(email=email).first()
            if numBookings + 1 >= event.participationLimit:
                return "Participation limit exceeded", status.HTTP_400_BAD_REQUEST
            session.add(newBooking)
            session.commit()

        return "Booking succesful!", status.HTTP_200_OK
    except:
        return (
            "An error occured when booking, please try again later",
            status.HTTP_400_BAD_REQUEST,
        )


@app.route("/bookings/delete", methods=["DELETE"])
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
        return (
            "Error occured when unbooking, please try again later",
            status.HTTP_400_BAD_REQUEST,
        )


@app.route("/bookings/mybookings", methods=["GET"])
@cross_origin()
def all_bookings():
    # give email as the foreign key for the bookings
    # give all the events that have my email
    userinfo = request.json
    email = userinfo["email"]
    with Session(engine) as session:
        # find all events associated with email
        query = (
            session.query(Bookings, Event)
            .join(Event, Event.eventID == Bookings.eventID)
            .filter(Bookings.email == email)
            .all()
        )
        events = []
        for q in query:
            temp = {
                "title": q.Event.title,
                "location": q.Event.location,
                "startTime": q.Event.startTime,
                "endTime": q.Event.endTime,
                "participationLimit": q.Event.participationLimit,
                "email": email,
            }
            events.append(temp)
        # remove strings from each event in array
        return jsonify(events), status.HTTP_200_OK


@app.route("/export/events")
def export_events():
    try:
        # connect to testdata.db
        conn = sql.connect("testdata.db")
        cursor = conn.cursor()
        # select all values from users table
        cursor.execute("SELECT * FROM events")
        result = cursor.fetchall()
        output = io.StringIO()
        writer = csv.writer(output)
        field_names = [i[0] for i in cursor.description]
        writer.writerow(field_names)

        for row in result:
            writer.writerow(row)

        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment;filename=event_report.csv"},
        )
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route("/export/users")
def export_users():
    try:
        # connect to testdata.db
        conn = sql.connect("testdata.db")
        cursor = conn.cursor()
        # select all values from users table
        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
        output = io.StringIO()
        writer = csv.writer(output)
        field_names = [i[0] for i in cursor.description]
        writer.writerow(field_names)

        for row in result:
            writer.writerow(row)

        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment;filename=user_report.csv"},
        )
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route("/export/calendar", methods=["GET"])
def create_calendar():
    newRequest = request.args  # get the EventID from the frontend
    # query event info based on eventID from the DB
    eventID = newRequest["eventID"]
    try:
        with Session(engine) as session:
            eventInfo = session.get(Event, eventID)
        if eventInfo is None:  # email exists in db, so send back user data
            return "Event doesn't exist", status.HTTP_400_BAD_REQUEST
        cal = Calendar()
        event = icalEvent()
        event.add("title", eventInfo["title"])
        event.add("name", eventInfo["title"])
        event.add("description", eventInfo["description"])

        # convert eventInfo times to datetime object
        startTime = datetime.strptime(eventInfo["startTime"], "%Y-%m-%d %H:%M")
        endTime = datetime.strptime(eventInfo["endTime"], "%Y-%m-%d %H:%M")
        event.add("dtstart", startTime)
        event.add("dtend", endTime)

        event["location"] = vText(eventInfo["location"])
        attendee = vCalAddress("MAILTO:{email}".format(email=eventInfo["email"]))
        event.add("attendee", attendee, encode=0)

        cal.add_component(event)

        # write cal to file (**just for testing**)
        f = open("test.ics", "wb")
        f.write(cal.to_ical())
        f.close()

        # send cal back to frontend to download
        return Response(
            cal.to_ical(),
            mimetype="text/calendar",
            headers={"Content-Disposition": "attachment;filename=calendar.ics"},
        )
    except Exception as e:
        print(e)


#### HELPER FUNCTION ####


def isAdmin(email):
    try:
        with Session(engine) as session:
            user = session.get(User, email)
    except MultipleResultsFound:
        return "Multiple users with this email found", status.HTTP_400_BAD_REQUEST

    except NoResultFound:
        return "No user with associated email found", status.HTTP_400_BAD_REQUEST

    return user.isAdmin == 1


def send_slack_message(payload):
    return requests.post(webhook, json.dumps(payload))
