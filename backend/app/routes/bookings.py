from flask import Blueprint, jsonify, request
from flask_api import status
from flask_cors import cross_origin
from app.models import Event, Bookings
from database import db

# Blueprint configuration
bookings = Blueprint(
    'bookings', __name__,
    url_prefix='/bookings'
)

@bookings.route("/create", methods=['POST'])  # user is the one who books
@cross_origin()
def book_event():
    bookingInfo = request.json
    eventID = bookingInfo["eventID"]
    email = bookingInfo["email"]

    try:
        with db.session as session:
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


@bookings.route("/delete", methods=['DELETE'])
@cross_origin()
def unbook_event():
    bookingInfo = request.json
    eventID = bookingInfo["eventID"]  # eventID to delete

    try:
        with db.session as session:
            booking = session.get(Bookings, eventID)
            session.delete(booking)
            session.commit()

        return "Event successfully unbooked", status.HTTP_200_OK
    except:
        return "Error occured when unbooking, please try again later", status.HTTP_400_BAD_REQUEST


@bookings.route("/mybookings", methods=['GET'])
@cross_origin()
def all_bookings():
    # give email as the foreign key for the bookings
    # give all the events that have my email
    userinfo = request.args
    email = userinfo["email"]
    with db.session as session:
            # find all events associated with email
            query = session.query(Bookings, Event).join(Event, Event.eventID == Bookings.eventID).filter(Bookings.email == email).all()
            events = []
            for q in query:
                temp = {'bookingID': q.Bookings.bookingID, 'title': q.Event.title, 'location': q.Event.location, 'startTime': q.Event.startTime, 'endTime': q.Event.endTime, 'participationLimit': q.Event.participationLimit, 'email': email}
                events.append(temp)
            # remove strings from each event in array
            return jsonify(events), status.HTTP_200_OK