from flask import Blueprint, current_app, render_template
from flask import current_app as app
from flask_cors import cross_origin
from app.models import User, db

# Blueprint configuration
event = Blueprint(
    'event', __name__,
    url_prefix='/event'
)

@event.route("/create", methods=['GET', 'POST'])
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
    #convert string to datetime for startTime
    startTime = datetime.strptime(startTime, '%Y-%m-%d %H:%M')
    month = startTime.strftime("%B")
    day = startTime.strftime("%d")
    hour = startTime.strftime("%H")

    # check if the user is an admin
    if (not isAdmin(email)):
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
            )
            session.add(event)
            session.commit()
            payload = {"text": eventTitle + " is on at " + location +  "! :tada: RSVP on SwyftSocial if you can make it :heart: It starts on " + str(month) + " " + str(day) + " at " + str(hour) + ":00!"}
            send_slack_message(payload)
        return "Event successfully created", status.HTTP_201_CREATED
    except Exception as e:
        print(e)

        return "Error occurred when creating an event", status.HTTP_400_BAD_REQUEST


@event.route("/delete", methods=['DELETE'])
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
            payload = {"text": event["title"] + " has been deleted :pensive:"}
            send_slack_message(payload)
            return "Event successfully deleted", status.HTTP_200_OK
    except:
        return "Error occured when deleting event, please try again later", status.HTTP_400_BAD_REQUEST


@event.route("/view", methods=['GET', 'POST'])
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
