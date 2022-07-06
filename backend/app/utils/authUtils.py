from app.models import User, Event
from flask_api import status
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm.exc import MultipleResultsFound
from database import db
from sqlalchemy.orm import Session


def isAdmin(email):
    try:
        # with db.session as session:
        user = db.session.get(User, email)
    except MultipleResultsFound:
        return "Multiple users with this email found", status.HTTP_400_BAD_REQUEST

    except NoResultFound:
        return "No user with associated email found", status.HTTP_400_BAD_REQUEST

    return user.isAdmin == 1


def isUser(email):
    count = db.session.query(User).filter_by(email=email).count()
    return count == 1


def isEvent(eventID):
    count = db.session.query(Event).filter_by(eventID=eventID).count()
    return count == 1
