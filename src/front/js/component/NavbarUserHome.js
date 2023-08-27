import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/NavbarUserHome.css"

export const NavbarUserHome = () => {
    const { store, actions } = useContext(Context);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid containerDeNavbarUerHome">
                <a className="navbar-brand" href="#"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693002236/rzis5kfsadg4tsrpc22j.png" className="logo-img img-fluid"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/UserHome">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Configuraciones</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/RegistroMovimientos" className="nav-link">Registro de Movimientos</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Informes Detallados</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleLogout}>Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
	);
};