from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
import json


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
    
    try:
        body = request.get_json()
        print("Request body:", body)
        
        user_name = body.get("user_name")
        first_name = body.get("first_name")
        last_name = body.get("last_name")
        email = body.get("email")
        password = body.get("password")
        
        if None in (user_name, first_name, last_name, email, password):
            return jsonify({"message": "Por favor, complete todos los campos"}), 400
        
        salt = bcrypt.gensalt(14)
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        user_exist = User.query.filter_by(email=email).one_or_none()
        if user_exist:
            return jsonify({"message": "Usuario ya existe"}), 400
        
        new_user = User(
            user_name=user_name,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=password_hash
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Usuario ya existe"}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error interno", "error": str(error)}), 500





# @api.route('/sign-in', methods=['POST'])
# def handle_login():
#     data = request.data
#     body = request.get_json()
#     print("Request body:", body)
#     print("Request data:", data)

#     email = body.get("email")
#     password = body.get("password")
    
#     data_decode = json.loads(data)
#     user = User.query.filter_by(email).first()
#     if user is None:
#         response_body = {
#             "message": user
#         }
#         return jsonify(response_body), 400
#     else:
#         response_body = {
#             "message": "usuario logeado con exito",
#         }
#         return jsonify(response_body), 200
    



# probando acceso a bd y creando el sign-in falta la password
@api.route('/sign-in', methods=['POST'])
def post_one_users():

    data = request.data
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    users_query = User.query.all()
    results = list(map(lambda item: item.serialize(), users_query))

    for user in results:
        if user['email'] == email:
            return  jsonify({"message": user}), 201 
    return  jsonify({"message": "error al buscar usuario"}), 500



# Consulta de todos los uarios
@api.route('/allUsers', methods=['GET'])
def get_all_users():

    users_query = User.query.all()
    results = list(map(lambda item: item.serialize(), users_query))

    response_body = {
       "results": results
    }

    return jsonify(response_body), 200

 
if __name__ == '__main__':
    api.run(debug=True)