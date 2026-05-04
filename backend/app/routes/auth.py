from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, set_access_cookies, unset_jwt_cookies
from app.extensions import db, blacklist
from app.models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("Incoming data:", data)
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

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    response = make_response(jsonify({"message": "Login successful"}))
    
    set_access_cookies(response, access_token)

    return response


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # unique token ID
    blacklist.add(jti)

    response = make_response(jsonify({"message": "Logged out"}))

    unset_jwt_cookies(response)

    return response

@auth_bp.route("/blacklist", methods=["GET"])
def get_blacklist():
    return jsonify({
        "blacklist": list(blacklist)
    })

@auth_bp.route("/profile", methods = ["GET"])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name
    }), 200