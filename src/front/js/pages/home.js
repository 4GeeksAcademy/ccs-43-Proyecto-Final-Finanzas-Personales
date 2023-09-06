import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="carouselExampleCaptions" className="carousel slide">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
				<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
			</div>
			<div className="carousel-inner">
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {/* Imagen para dispositivos grandes */}
                        <img
                            src="https://res.cloudinary.com/dronv3ars/image/upload/v1693999662/Control_lw9rkj.png"
                            className="pic1Lg mx-auto img-fluid d-none d-lg-block" // Mostrar en dispositivos grandes y ocultar en dispositivos medianos y pequeños
                            alt="Imagen para dispositivos grandes"
                        />
                        {/* Imagen para dispositivos medianos y pequeños */}
                        <img
                            src="https://res.cloudinary.com/dronv3ars/image/upload/v1694000131/Registra_de_manera_sencilla_todos_tus_ingresos_y_egresos._posohs.png"
                            className="mx-auto img-fluid d-lg-none" // Mostrar en dispositivos medianos y pequeños y ocultar en dispositivos grandes
                            alt="Imagen para dispositivos medianos y pequeños"
                        />
                    </div>
                </div>    
            </div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};
