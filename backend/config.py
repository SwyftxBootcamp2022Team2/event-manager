"""Flask configuration."""
from os import environ, path
from dotenv import load_dotenv


basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

DEBUG = True
FLASK_ENV = 'developement'
CORS_HEADERS = 'Content-Type'
SLACK_WEBHOOK = environ.get("SLACK_WEBHOOK")
SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
DB_NAME = environ.get("DB_NAME")
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False # Set to true to log all database activity

