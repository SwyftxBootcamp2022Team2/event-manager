from flask import Blueprint, jsonify, request
from app.models import User
from database import db
from flask_api import status
from flask_cors import cross_origin


# Blueprint configuration
auth = Blueprint(
    'auth', __name__,
)

# Login
@auth.route("/login", methods=['POST'])
@cross_origin()
def login():
    user = request.json
    email = user["email"]

    userInDB = db.session.query(User).filter_by(email=email).first()

    # return user
    return jsonify(email=userInDB.email, fName=userInDB.fname, lName=userInDB.lname, isAdmin=userInDB.isAdmin), status.HTTP_200_OK

# User not found
@auth.errorhandler(404)
def user_not_found(ex):
    return jsonify(error="User not found"), status.HTTP_404_NOT_FOUND