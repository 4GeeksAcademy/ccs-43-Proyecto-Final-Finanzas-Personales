from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError


api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    print("Received POST request at /api/signup")
    body = request.get_json()
    print("Request body:", body)
    user_name = body.get("user_name", None)
    first_name = body.get("first_name", None)
    last_name = body.get("last_name", None)
    email = body.get("email", None)
    password = body.get("password", None) 
    
    if user_name is None or first_name is None or last_name is None or email is None or password is None:
        return jsonify({
            "message": "Adios"
        }), 400
    
    salt = bcrypt.gensalt(14)
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    user_exist = User.query.filter_by(email=email).one_or_none()
    if user_exist is not None:
        return jsonify({
            "message": "User ya existe"
        }), 400
    
    user = User(
        user_name = user_name,
        first_name = first_name,
        last_name = last_name,
        email = email,
        password_hash = password_hash
    )

    try:
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            "message": "User ya existe"
        }), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": str(error)
        }), 500
