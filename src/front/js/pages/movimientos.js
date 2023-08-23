import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/movimientos.css";

export const Movimientos = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
        <div className="container-fluid FondoRegistroDeUsuario">
        </div>
        <div className="container">
            <h3 id="registroDeMovimiento">Registro de Movimiento</h3>
            <form onSubmit={handleSubmit} className="formularioDeRegistroDeMovimiento">
                <input className="inputRegistroDeMovimiento" type="text" name="user_name" placeholder="Nombre de usuario" required />
                <input className="inputRegistroDeMovimiento" type="text" name="first_name" placeholder="Nombre" required />
                <input className="inputRegistroDeMovimiento" type="text" name="last_name" placeholder="Apellido" required />
                <input className="inputRegistroDeMovimiento" type="email" name="email" placeholder="Correo electrónico" required />
                <input className="inputRegistroDeMovimiento" type="password" name="password" placeholder="Contraseña" required />
                <button className="buttonCargadeDatosDeRegistroDeUsuario btn btn-outline-primary" type="submit">Registrarse  <i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <p style={{whiteSpace: 'nowrap', display: 'inline-block'}} className="d-flex">¿Ya te registraste?  <Link to="/" style={{marginLeft: '5px'}}>Iniciar sesión</Link></p>
        </div>
        </div>
    )
} 

