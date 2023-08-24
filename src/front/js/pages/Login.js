import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/login.css"
import { Context } from "./../store/appContext";

export const Login = () => {
    const {actions} = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post(
                process.env.BACKEND_URL + "/api/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            actions.savetoken(response.data.token)
            console.log("Inicio de sesión exitoso", response.data);
            // You can perform any necessary action after successful login, like redirecting the user.
        } catch (error) {
            console.error("Error al iniciar sesión", error.response.data);
        }
    };

    return (
        <div className="container-fluid">
        <div className="container-fluid FondoRegistroDeLogin">
        </div>
        <div className="container">
            <h3 id="tituloDeLogin"><i className="fa-solid fa-user"></i> Iniciar sesión</h3>
            <form onSubmit={handleSubmit} className="formularioDeLogin">
                <input className="inputDeLogin" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputDeLogin" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeLogin btn btn-outline-primary" type="submit">Iniciar sesión  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <p style={{whiteSpace: 'nowrap', display: 'inline-block'}} className="d-flex">¿Aún no tienes una cuenta? <Link to="/registro" style={{marginLeft: '5px'}}>Registrarse</Link></p>
        </div>
    </div>
    );
};
