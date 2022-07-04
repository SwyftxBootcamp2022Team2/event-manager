
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

Base = declarative_base()
engine = create_engine("sqlite+pysqlite:///testdata.db",
                       echo=True, future=True)
Base.metadata.create_all(engine)


class User(Base):
    __tablename__ = 'users'
    email = Column(String,primary_key=True, nullable = False)
    lname = Column(String, nullable = False)
    fname = Column(String, nullable = False)
    department = Column(String)
    dietary = Column(String)
    accessibility = Column(String)
    isAdmin = Column(Integer, nullable = False)

    # relationships
    event = relationship('Event')
    booking = relationship("Bookings")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Event(Base):
    __tablename__ = 'events'
    eventID = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    startTime = Column(String)
    endTime = Column(String)
    participationLimit = Column(Integer)
    publishTime = Column(String)
    email = Column(String, ForeignKey("users.email"),)
    #email = relationship("User")
    #booking = relationship("Bookings")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Bookings(Base):
    __tablename__ = 'bookings'
    bookingID = Column(Integer, primary_key=True)
    eventID = Column(Integer, ForeignKey("events.eventID"), nullable=False)
    email = Column(String, ForeignKey("users.email"),)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    # relationships
    #user = relationship("User")
    #event = relationship("Event")


# # pre-populate data
# with Session(engine) as session:
#     admin = User(
#         email="admin@gmail.com",
#         fname="Admin",
#         lname="User",
#         isAdmin=1
#     )

#     user = User(
#         email="user@gmail.com",
#         fname="Average",
#         lname="User",
#         isAdmin=0
#     )

#     newEvent = Event(
#         createdBy = "admin@gmail.com",
#         title = "Event 1",
#         location = "Location 1",
#         startTime = "10:10",
#         endTime = "11"
#     )

#     newBooking = Bookings(
#         eventID = 1,
#         email="admin@gmail.com"
#     )


#     session.add_all([admin, user, newEvent])

#     session.commit()
