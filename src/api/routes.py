from flask import Blueprint, request, jsonify, session
from api.models import db, User, MoneyRegister, TypeOfCategories
from api.utils import generate_sitemap, APIException
import bcrypt
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
import json
from passlib.hash import bcrypt_sha256
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
        

        password_hash = bcrypt_sha256.hash(password)
        
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






# probando acceso a bd y creando el sign-in falta la password
@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        email = body.get("email")
        password = body.get("password")

        if None in (email, password):
            return jsonify({"message": "Por favor, complete todos los campos"}), 400

        user = User.query.filter_by(email=email).one_or_none()

        if user and bcrypt_sha256.verify(password, user.password_hash):
            session['user_id'] = user.id
            token = create_access_token(identity= user.id)
            return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401

    except Exception as error:
        return jsonify({"message": "Error interno", "error": str(error)}), 500

@api.route("/protected", methods=["GET"])
@jwt_required()
def get_protected_data():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    print(current_user_id)
    if user:
        return jsonify({
            **user.serialize(),
            "money_register": [transaction.serialize() for transaction in user.money_register]
        }), 200
    else:
        return jsonify({"message" :"User not found"}), 404


# Consulta de todos los uarios
@api.route('/allUsers', methods=['GET'])
def get_all_users():

    users_query = User.query.all()
    results = list(map(lambda item: item.serialize(), users_query))

    response_body = {
       "results": results
    }

    return jsonify(response_body), 200


# Post de los Movimientos

@api.route('/RegistroMovimientos', methods=['POST'])
@jwt_required()
def registerMovement():
    print("Received POST request at /api/RegistroMovimientos")
    try:
        body = request.get_json()
        print("Request body:", body)

        time_selected = body.get("fecha")
        tipo_movimiento = body.get("tipo")
        tipo_categoria = body.get("categoria")
        monto = body.get("monto")

        if tipo_movimiento is None or tipo_categoria is None or monto is None:
            return jsonify({
                "message": "Tipo de movimiento, tipo de categoria y monto son requeridos"
            }), 400

        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404

        movement = MoneyRegister(
            time_selected=time_selected,
            tipo_movimiento=tipo_movimiento,
            tipo_categoria=tipo_categoria,
            monto=monto,
            user=user  
        )
        
        db.session.add(movement)
        db.session.commit()

        return jsonify({"message": "Movimiento registrado exitosamente"}), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error interno", "error": str(error)}), 500

   

@api.route('/RegistroCategorias', methods=['POST'])
@jwt_required()
def registerCategory():
    try:
        body = request.get_json()

        movement_type = body.get("tipo")
        category = body.get("categoria")

        if movement_type is None or category is None:
            return jsonify({
                "message": "Tipo de movimiento y categoría son requeridos"
            }), 400

        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404

        new_category = TypeOfCategories(
            movement_type=movement_type,
            category=category,
            user=user  
        )
        
        db.session.add(new_category)
        db.session.commit()

        return jsonify({"message": "Categoría registrada exitosamente"}), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error interno", "error": str(error)}), 500

@api.route('/ObtenerCategorias', methods=['GET'])
@jwt_required()
def get_categories():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if user is None:
            return jsonify({"error": "Usuario no encontrado"}), 404

        categories = TypeOfCategories.query.filter_by(user=user).all()
        serialized_categories = [category.serialize() for category in categories]

        return jsonify({"categories": serialized_categories}), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener categorías", "details": str(e)}), 500


@api.route('/EliminarCategoria/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    try:
        category = TypeOfCategories.query.get(category_id)

        if category is None:
            return jsonify({"error": "Categoría no encontrada"}), 404

        db.session.delete(category)
        db.session.commit()

        return jsonify({"message": "Categoría eliminada exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": "Error al eliminar categoría", "details": str(e)}), 500


if __name__ == '__main__':
    api.run(debug=True)


