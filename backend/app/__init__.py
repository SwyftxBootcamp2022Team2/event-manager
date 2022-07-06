from os import path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from database import db
from app.utils.databaseUtils import create_database, seed_database
from config import DB_NAME


def create_app():
    """Initialise the core application"""
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_pyfile("../config.py")

    # Initialise plugins
    db.init_app(app)

    with app.app_context():
        # Import parts of our application
        from .routes import auth, bookings, event, user, export

        # Create database if not already made
        if not path.exists(DB_NAME):
            create_database()
            seed_database()

        # Register Blueprints
        app.register_blueprint(auth.auth)
        app.register_blueprint(bookings.bookings)
        app.register_blueprint(event.event)
        app.register_blueprint(user.user)
        app.register_blueprint(export.export)

        # Hello world endpoint
        @app.route("/")
        @cross_origin()
        def hello():
            return "Hello, World!"

        return app
