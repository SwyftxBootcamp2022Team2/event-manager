from flask import Blueprint, jsonify,request
from flask_cors import cross_origin
from flask_api import status
from sqlalchemy import update
from app.models import User
from database import db

# Blueprint configuration
user = Blueprint(
    'user', __name__,
    url_prefix='/user'
)

@user.route("/get", methods=['GET'])
@cross_origin()
def get_user():
    user = request.json
    email = user["email"]

    userinfo = db.session.query(User).filter_by(email=email).first()
    if userinfo is not None:     # check if user is in database, and give back their info
        return jsonify(
            email=userinfo.email, 
            fname=userinfo.fname, 
            lname=userinfo.lname, 
            isAdmin=userinfo.isAdmin,
            department=userinfo.department,
            dietary=userinfo.dietary,
            accessibility=userinfo.accessibility), status.HTTP_200_OK
    # if not, send back a token, (its a get so don't add this user into the "user" db)
    return "Couldn't find user!", status.HTTP_404_NOT_FOUND

@user.route("/update", methods=['PATCH'])
@cross_origin()
def update_user():
    user = request.json
    email = user["email"]
    fName = user["fname"]
    lName = user["lname"]
    department = user["department"]
    dietary = user["dietary"]
    accessibility = user["accessibility"]
    try:
        db.session.execute(
            update(User)
            .where(User.email==email)
            .values(
                fname = fName,
                lname = lName,
                department = department,
                dietary = dietary,
                accessibility = accessibility)
        ) 
        db.session.commit()

    except Exception as e:
        print(e)
        return "Error updating user information", status.HTTP_400_BAD_REQUEST

    return "User information successfully updated", status.HTTP_200_OK
