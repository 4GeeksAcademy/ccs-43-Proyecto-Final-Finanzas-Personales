import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css"
// import "../../styles/Registro.css"
import { Link } from "react-router-dom";

export const Login = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        try {
            const response = await axios.post(
                process.env.BACKEND_URL+"/api/sign-in",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );
        } catch (error) {
            console.error("Error al realizar el login", error.response.data);
        }
    };

    return (
        <div className="container-fluid">
        <div className="container-fluid FondoDeLogin">
        </div>
        <div className="container">
            <h3 id="tituloRegistroDeLogin"><i className="fa-solid fa-user"></i>Login de Usuario</h3>
            <form onSubmit={handleSubmit} className="formularioDeLogin">

                <input className="inputDeLogin" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputDeLogin" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeLogin btn btn-outline-primary" type="submit"> Entrar  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            
        </div>
        </div>
    );
};