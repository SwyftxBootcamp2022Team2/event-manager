
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String,primary_key=True, nullable = False)
    lname = db.Column(db.String, nullable = False)
    fname = db.Column(db.String, nullable = False)
    isAdmin = db.Column(db.Integer, nullable = False)

class Event(db.Model):
    __tablename__ = 'events'
    eventID= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable = False)
    location = db.Column(db.String, nullable = False)
    start = db.Column(db.String, nullable = False) 
    startTime = db.Column(db.DateTime, nullable = False)
    endTime = db.Column(db.DateTime, nullable = False)
    participationLimit = db.Column(db.Integer)
    createdBy = db.Column(db.Integer)
    
class Bookings(db.Model):
    __tablename__ = 'bookings'
    bookingID = db.Column(db.Integer, primary_key=True)
    eventID = db.Column(db.Integer, nullable = False)
    userID = db.Column(db.Integer, nullable = False)