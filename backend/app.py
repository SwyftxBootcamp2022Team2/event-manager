from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request

app = Flask(__name__)
db = SQLAlchemy(app)
print("__init__.py: app and db initialized")



class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String,primary_key=True, nullable = False)
    lname = db.Column(db.String, nullable = False)
    fname = db.Column(db.String, nullable = False)
    isAdmin = db.Column(db.Integer, nullable = False)

class Event(db.Model):
    __tablename__ = 'events'
    eventID= db.Column(db.Integer, 
                          primary_key=True)
    title = db.Column(db.String, nullable = False)
    location = db.Column(db.String, nullable = False)
    start = db.Column(db.String, nullable = False) 
    startTime = db.Column(db.String, nullable = False)
    endTime = db.Column(db.String, nullable = False)
    participationLimit = db.Column(db.Integer)
    createdBy = db.Column(db.Integer)
    
class Bookings(db.Model):
    __tablename__ = 'bookings'
    bookingID = db.Column(db.Integer, 
                          primary_key=True)
    eventID = db.Column(db.Integer, nullable = False)
    userID = db.Column(db.Integer, nullable = False)


@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/login", methods=['POST', 'GET'])
def login():
    # jsonify result from frontend
    user = request.json['email', 'fname', 'lname', 'isAdmin']
    email = user["email"]
    exists = db.session.query(User.email).filter_by(email=email).first() is not None
    if exists:     # check if user is in database
        return email #role, isadmin, smth else # if exists, send back a token
    else: # if not, create new user, send back a token
        #db.session.add(user)
        raise Exception("Couldn't find user", 400)

