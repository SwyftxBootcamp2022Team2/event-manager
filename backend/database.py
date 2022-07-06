from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

db = SQLAlchemy()

Base = declarative_base()
engine = create_engine("sqlite+pysqlite:///database.db", echo=True, future=True)
Base.metadata.create_all(engine)
