import React, { useState } from "react";
import axios from "axios";
import "../../styles/Registro.css"
import { Link } from "react-router-dom";

export const Registro = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            user_name: e.target.user_name.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        try {
            const response = await axios.post(
                "https://zany-bassoon-x69q4qv6655c6994-3001.app.github.dev/api/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            console.log("Registro exitoso", response.data);
        } catch (error) {
            console.error("Error al registrar", error.response.data);
        }
    };

    return (
        <div className="container-fluid">
        <div className="container-fluid FondoRegistroDeUsuario">
        </div>
        <div className="container">
            <h3 id="tituloRegistroDeUsuario"><i className="fa-solid fa-user"></i> Registro de Usuario</h3>
            <form onSubmit={handleSubmit} className="formularioDeRegistroDeUsuario">
                <input className="inputRegistroDeUsuario" type="text" name="user_name" placeholder="Nombre de usuario" required />
                <input className="inputRegistroDeUsuario" type="text" name="first_name" placeholder="Nombre" required />
                <input className="inputRegistroDeUsuario" type="text" name="last_name" placeholder="Apellido" required />
                <input className="inputRegistroDeUsuario" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputRegistroDeUsuario" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeRegistroDeUsuario btn btn-outline-primary" type="submit">Registrarse  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <p style={{whiteSpace: 'nowrap', display: 'inline-block'}} className="d-flex">¿Ya te registraste?  <Link to="/" style={{marginLeft: '5px'}}>Iniciar sesión</Link></p>
        </div>
        </div>
    );
};