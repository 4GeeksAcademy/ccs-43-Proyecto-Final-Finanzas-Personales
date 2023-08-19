import React from "react";
import { Link } from "react-router-dom";
import Brand from "../../img/Wallet-Rack_Logo_sinFondo.png";

export const Navbar = () => {
	return (
		<nav className="navbar d-flex justify-content-around navbar-light p-2">
			<div className="wrap d-flex align-items-center justify-content-between" style={{width: "90%"}}>
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><img src={Brand} className="logo-img img-fluid"/></span>
				</Link>
				<div className="d-flex justify-content-between">
					<Link to="/demo">
						<button className="btn btn-outline-light me-3">Iniciar sesión</button>
					</Link>
					<button className="btn btn-outline-light">Registrarse</button>
				</div>
			</div>
		</nav>
	);
};
