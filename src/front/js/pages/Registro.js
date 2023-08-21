import React, { useState } from "react";
import axios from "axios";

export const Registro = () => {
    const [formData, setFormData] = useState({
        user_name: "",
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <div className="container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user_name" placeholder="Nombre de usuario" onChange={handleChange} required />
                <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                <input type="password" name="password_hash" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};
