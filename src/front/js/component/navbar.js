import React from "react";
import "../../styles/navbar.css"
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar d-flex justify-content-around navbar-light p-0">
			<div className="wrap d-flex align-items-center justify-content-between" style={{width: "90%"}}>
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704267/Wallet-Rack_Logo_sinFondo_gs85ru.png" className="logo-img img-fluid"/></span>
				</Link>
				<div className="d-flex justify-content-between gap-4">
					<Link to="nosotros" className="text-light text-decoration-none">Nosotros</Link>
					<Link to="/Login" className="btn btn-outline-light text-decoration-none">
						Iniciar sesión
					</Link>
					<Link to="/Registrarse" className="btn btn-outline-light text-decoration-none">
						Registrarse
					</Link>
				</div>
			</div>
		</nav>
	);
};