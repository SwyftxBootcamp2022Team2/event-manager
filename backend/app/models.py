"""Date models"""
from multiprocessing import BoundedSemaphore
from sqlalchemy import ForeignKey, create_engine
from sqlalchemy.orm import declarative_base
from config import SQLALCHEMY_DATABASE_URI
from database import db


class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.Text,primary_key=True)
    lname = db.Column(db.Text, nullable = False)
    fname = db.Column(db.Text, nullable = False)
    isAdmin = db.Column(db.Integer, nullable = False)
    department = db.Column(db.Text)
    dietary = db.Column(db.Text)
    accessibility = db.Column(db.Text)

    # Relationships
    event = db.relationship('Event')
    booking = db.relationship("Bookings")


class Event(db.Model):
    __tablename__ = 'events'
    eventID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.Text, nullable=False)
    startTime = db.Column(db.Text)
    endTime = db.Column(db.Text)
    participationLimit = db.Column(db.Text)
    publishTime = db.Column(db.Text)
    email = db.Column(db.Text, db.ForeignKey("users.email"))

class Bookings(db.Model):
    __tablename__ = 'bookings'
    bookingID = db.Column(db.Integer, primary_key=True)
    eventID = db.Column(db.Integer, db.ForeignKey("events.eventID"), nullable=False)
    email = db.Column(db.Text, ForeignKey("users.email"),)
