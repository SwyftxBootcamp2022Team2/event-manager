from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_api import status
from flask_cors import cross_origin
from app.utils.authUtils import isAdmin
from app.utils.slackUtils import send_slack_message
from app.utils.dateTimeUtils import convertUTCtoBrisbaneTime
from database import db
from app.models import Event

# Blueprint configuration
event = Blueprint("event", __name__, url_prefix="/event")


@event.route("/create", methods=["GET", "POST"])
@cross_origin()
def create_event():
    requestBody = request.json

    # check auth
    email = requestBody["email"]
    if not isAdmin(email):
        return "You are not an admin!", status.HTTP_400_BAD_REQUEST

    # calculate startTime as date + startTime
    startTime = requestBody["date"][0:10] + requestBody["startTime"][10:24]
    endTime = requestBody["date"][0:10] + requestBody["endTime"][10:24]
    
    # get rest of form body
    title=requestBody["title"]
    location=requestBody["location"]
    participationLimit=requestBody["participationLimit"]
    
    dateObj = datetime.strptime(startTime, "%Y-%m-%dT%H:%M:%S.%fZ")

    # create event
    try:
        event = Event(
            email=email,
            title=title,
            location=location,
            startTime=startTime,
            endTime=endTime,
            participationLimit=participationLimit,
        )
        
        db.session.add(event)
        db.session.commit()

        payload = {
            "text": title
            + " is on at "
            + location
            + "! :tada: RSVP on SwyftSocial if you can make it :heart: Starts on "
            + convertUTCtoBrisbaneTime(dateObj).strftime('%A, %d %B %Y %I:%M%p')
            + ""
        }
        send_slack_message(payload)
        return "Event successfully created", status.HTTP_201_CREATED
    except Exception as e:
        print(e)
        return "Error occurred when creating an event", status.HTTP_400_BAD_REQUEST


@event.route("/delete", methods=["DELETE"])
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
        event = db.session.get(Event, eventID)
        db.session.delete(event)
        db.session.commit()
        payload = {"text": event["title"] + " has been deleted :pensive:"}
        send_slack_message(payload)
        return "Event successfully deleted", status.HTTP_200_OK
    except:
        return (
            "Error occured when deleting event, please try again later",
            status.HTTP_400_BAD_REQUEST,
        )


@event.route("/view", methods=["GET", "POST"])
@cross_origin()
def view_event():
    # get data from frontend
    event = request.json
    # check if event exists
    eventID = event["eventID"]

    eventInfo = db.session.query(Event).filter_by(eventID=eventID).first()
    if eventInfo is not None:  # if it exists, send that mf back
        return (
            jsonify(
                eventID=eventInfo.eventID,
                title=eventInfo.title,
                location=eventInfo.location,
                startTime=eventInfo.startTime,
                endTime=eventInfo.endTime,
                participationLimit=eventInfo.participationLimit,
                email=eventInfo.email,
            ),
            status.HTTP_200_OK,
        )
    # if not, send back a token
    return "Event Doesn't Exist!", status.HTTP_400_BAD_REQUEST


@event.route("/event/get", methods=["GET"])
@cross_origin()
def get_events():
    query = db.session.query(Event).all()
    events = []
    for q in query:
        temp = {
            "eventID": q.eventID,
            "title": q.title,
            "description": q.description,
            "location": q.location,
            "startTime": q.startTime,
            "endTime": q.endTime,
            "participationLimit": q.participationLimit,
            "email": q.email,
            "publishTime": q.publishTime,
        }
        events.append(temp)
    # remove strings from each event in array
    return (
        jsonify(eventData=events),
        status.HTTP_200_OK,
    )  # jsonify(events=events), status.HTTP_200_OK
