from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt
from app.models import User
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    print("DB URL:", app.config.get("SQLALCHEMY_DATABASE_URI"))
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    return app