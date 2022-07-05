from database import db
from app.models import Bookings, User, Event

def create_database():
            db.create_all()
            print(" * Created Database")

def seed_database():
    users = [
        {
            "email" : "admin@gmail.com",
            "fname" : "Admin",
            "lname" : "User",
            "isAdmin" : True
        },{
             "email" : "user@gmail.com",
            "fname" : "Admin",
            "lname" : "User",
            "isAdmin" : False
        },
    ]

    for u in users:
        new_user = User(email=u["email"], fname=u["fname"], lname=u["lname"], isAdmin=u["isAdmin"])
        db.session.add(new_user)

    events = [
        {
            "createdBy" : "admin@gmail.com",
            "title" : "Event 1",
            "location" : "Location 1",
            "startTime" : "10:10",
            "endTime" : "11"
        }
    ]

    for e in events:
        new_event = Event(email=e["createdBy"], title=e["title"], location=e["location"], startTime=e["startTime"], endTime=e["endTime"])
        db.session.add(new_event)

    bookings = [
         {
            "eventID" : "1",
            "email" : "admin@gmail.com"
         }
    ]
    
    for b in bookings:
        new_booking = Bookings(eventID=b["eventID"], email=b["email"])
        db.session.add(new_booking)

    db.session.commit()
    print(" * Seeded Database")

