import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access"]
    JWT_DECODE_LEEWAY = 20

    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_COOKIE_NAME = "access_token"
    JWT_COOKIE_CSRF_PROTECT = True  # enable later for production
    JWT_CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"]


    #For dev
    JWT_COOKIE_SECURE = False   # ⚠️ True in production (HTTPS)
    JWT_COOKIE_SAMESITE = "Lax" 