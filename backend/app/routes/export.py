import csv
import io
from flask import Blueprint, Response, request
import sqlite3 as sql
from config import DB_NAME
from icalendar import Calendar, vCalAddress, vText
from icalendar import Event as icalEvent
from datetime import datetime
from app.models import Event
from flask_api import status
from database import db

# Blueprint configuration
export = Blueprint("export", __name__, url_prefix="/export")


@export.route("/allevents")
def export_events():
    try:
        # get all events from the database

        result = db.session.query(Event).all()
        # create a calendar object

        output = io.StringIO()
        writer = csv.writer(output)
        # field_names = [i[0] for i in cursor.description]
        # writer.writerow(field_names)
        for row in result:
            writer.writerow(row)
        return Response(
            output,
            mimetype="text/csv",
            headers={"Content-Disposition": "attachment;filename=event_report.csv"},
        )
    except Exception as e:
        print(e)


@export.route("/allusers")
def export_users():
    try:
        # connect to testdata.db
        conn = sql.connect(DB_NAME)
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


@export.route("/export/calendar", methods=["GET"])
def create_calendar():
    newRequest = request.args  # get the EventID from the frontend
    # query event info based on eventID from the DB
    eventID = newRequest["eventID"]
    try:
        with db.session as session:
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
