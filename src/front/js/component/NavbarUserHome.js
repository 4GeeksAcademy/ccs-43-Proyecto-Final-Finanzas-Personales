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
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="navUserHomeNicoSupremo">
            <div className="container-fluid containerDeNavbarUerHome">
                <a className="navbar-brand" href="#"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704267/Wallet-Rack_Logo_sinFondo_gs85ru.png" className="logo-img img-fluid NicoNavbarUSerHomeImg"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/UserHome">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/Categorias">Personalizar Categorias</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/RegistroMovimientos" className="nav-link text-light">Registro de Movimientos</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light"  href="/Informe-Detallado">Informes Detallados</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#" onClick={handleLogout}>Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
	);
};