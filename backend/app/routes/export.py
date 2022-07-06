import csv
import io
from flask import Blueprint, Response, request
import sqlite3 as sql
from icalendar import Calendar, vCalAddress, vText
from icalendar import Event as icalEvent
from datetime import datetime
from app.models import Event
from flask_api import status
from database import db
from app.utils.authUtils import isAdmin
from icalendar import Calendar, vCalAddress, vText
from icalendar import Event as icalEvent

# Blueprint configuration
export = Blueprint("export", __name__, url_prefix="/export")


@export.route("/allevents/", methods=["GET"])
def export_events():
    try:
        # get user info
        userinfo = request.json
        if not isAdmin(userinfo["email"]):
            return "Invalid Request", status.HTTP_400_BAD_REQUEST

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

        output.seek(0)  # need to reset the file pointer (doesn't work otherwise)

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


@export.route("/calendar", methods=["GET"])
def create_calendar():
    try:
        newRequest = request.args  # get the EventID from the frontend
        # query event info based on eventID from the DB
        eventID = newRequest["eventID"]

        eventInfo = db.session.get(Event, eventID)
        if eventInfo is None:  # email exists in db, so send back user data
            return "Event doesn't exist", status.HTTP_400_BAD_REQUEST
        cal = Calendar()
        event = icalEvent()

        event.add("title", eventInfo.title)
        event.add("name", eventInfo.title)
        event.add("description", eventInfo.description)

        # convert eventInfo times to datetime object
        startTime = datetime.strptime(eventInfo.startTime, "%Y-%m-%d %H:%M")
        endTime = datetime.strptime(eventInfo.startTime, "%Y-%m-%d %H:%M")
        event.add("dtstart", startTime)
        event.add("dtend", endTime)

        event["location"] = vText(eventInfo.location)
        attendee = vCalAddress("MAILTO:{email}".format(email=eventInfo.email))
        event.add("attendee", attendee, encode=0)

        cal.add_component(event)

        # send cal back to frontend to download
        return Response(
            cal.to_ical(),
            mimetype="text/calendar",
            headers={"Content-Disposition": "attachment;filename=calendar.ics"},
        )
    except Exception as e:
        print(e)
        return "failed", status.HTTP_400_BAD_REQUEST
