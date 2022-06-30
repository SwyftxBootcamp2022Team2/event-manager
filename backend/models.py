
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

Base = declarative_base()
engine = create_engine("sqlite+pysqlite:///testdata.db", echo=True, future=True)
Base.metadata.create_all(engine)

class User(Base):
    __tablename__ = 'users'
    email = Column(String,primary_key=True, nullable = False)
    lname = Column(String, nullable = False)
    fname = Column(String, nullable = False)
    department = Column(String, nullable = False)
    dietary = Column(String)
    accessibility = Column(String)
    isAdmin = Column(Integer, nullable = False)

    #relationships
    #event = relationship("Event")
    #booking = relationship("Bookings")


class Event(Base):
    __tablename__ = 'events'
    eventID= Column(Integer, primary_key=True)
    createdBy = Column(Integer, ForeignKey("users.email"),)
    title = Column(String, nullable = False)
    location = Column(String, nullable = False)
    startTime = Column(DateTime, nullable = False)
    endTime = Column(DateTime, nullable = False)
    participationLimit = Column(Integer)
    publishTime = Column(DateTime)
    #email = Column(Integer, ForeignKey("user.email"))
    #email = relationship("User")
    #booking = relationship("Bookings")
    
class Bookings(Base):
    __tablename__ = 'bookings'
    bookingID = Column(Integer, primary_key=True)
    eventID = Column(Integer, ForeignKey("events.eventID"), nullable = False)
    email = Column(String, ForeignKey("users.email"),)
    eventID = Column(Integer)

    #relationships
    #user = relationship("User")
    #event = relationship("Event")

# # pre-populate data
# with Session(engine) as session:
#     admin = User(
#         email = "admin@gmail.com",
#         fname = "Admin",
#         lname = "User",
#         isAdmin = 1,
#         department = "P & C"
#     )

#     user = User(
#         email = "user@gmail.com",
#         fname = "Average",
#         lname = "User",
#         isAdmin = 0,
#         department = "R & D",
#         dietary = "halal",
#         accessibility = "wheelchair"
#     )

#     session.add_all([admin, user])

#     session.commit()
