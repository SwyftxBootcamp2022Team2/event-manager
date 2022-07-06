
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from config import SQLALCHEMY_DATABASE_URI

Base = declarative_base()
engine = create_engine(SQLALCHEMY_DATABASE_URI,
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
    email = Column(String, ForeignKey("users.email"))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Bookings(Base):
    __tablename__ = 'bookings'
    bookingID = Column(Integer, primary_key=True)
    eventID = Column(Integer, ForeignKey("events.eventID"), nullable=False)
    email = Column(String, ForeignKey("users.email"),)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
