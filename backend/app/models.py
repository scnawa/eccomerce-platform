from datetime import date
from .extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)

    username = db.Column(db.String(50), unique=True, nullable=False)

    first_name = db.Column(db.String(100), nullable=True)

    last_name = db.Column(db.String(100), nullable=True)

    date_of_birth = db.Column(db.Date, nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    password_hash = db.Column(db.String(255), nullable=False)

    # Set password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Check password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"