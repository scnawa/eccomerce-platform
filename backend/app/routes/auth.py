from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    date_of_birth = data.get("date_of_birth")

    if not email or not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = User.query.filter(
        (User.email == email) | (User.username == username)
    ).first()

    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    user = User(
        email=email,
        username=username,
        first_name=first_name,
        last_name=last_name,
        date_of_birth=date_of_birth
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered"}), 201

@auth_bp.route("login")
def login():
    pass


@auth_bp.route("logout")
def logout():
    pass