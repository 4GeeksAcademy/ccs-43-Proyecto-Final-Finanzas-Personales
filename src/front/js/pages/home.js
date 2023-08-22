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
				<div className="carousel-item active">
				<img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704271/Imagen1_r6j4ee.jpg" className="d-block mx-auto img-fluid" alt="..." />
				<div className="carousel-caption d-none d-md-block">
					<h5>Control total de tus finanzas</h5>
					<p>Registra de manera sencilla todos tus ingresos y egresos. Mantén un seguimiento claro de tus transacciones para tomar decisiones financieras informadas.</p>
				</div>
				</div>
				<div className="carousel-item">
				<img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704271/Imagen1_r6j4ee.jpg" className="d-block mx-auto img-fluid" alt="..."/>
				<div className="carousel-caption d-none d-md-block">
					<h5>Visualiza tu progreso de un vistazo</h5>
					<p>Observa tu balance financiero en gráficos visuales y atractivos. Nuestros gráficos interactivos te brindan una perspectiva clara de cómo evolucionan tus finanzas a lo largo del tiempo.</p>
				</div>
				</div>
				<div className="carousel-item">
				<img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704271/Imagen1_r6j4ee.jpg" className="d-block mx-auto img-fluid" alt="..."/>
				<div className="carousel-caption d-none d-md-block">
					<h5>A tu manera, tus categorías</h5>
					<p>Personaliza tus categorías de ingresos y egresos para que se ajusten a tu estilo de vida único. Adapta la plataforma a tus necesidades y prioridades financieras.</p>
				</div>
				</div>
				<div className="carousel-item">
				<img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704271/Imagen1_r6j4ee.jpg" className="d-block mx-auto img-fluid" alt="..."/>
				<div className="carousel-caption d-none d-md-block">
					<h5>Metas de ahorro alcanzables</h5>
					<p>Establece objetivos de ahorro personalizados y alcanzables. Nuestra plataforma te ayuda a trazar un camino claro hacia tus sueños financieros, ya sea un viaje, un nuevo hogar o cualquier otro objetivo.</p>
				</div>
				</div>
				<div className="carousel-item">
				<img src="https://res.cloudinary.com/dronv3ars/image/upload/v1692704271/Imagen1_r6j4ee.jpg" className="d-block mx-auto img-fluid" alt="..."/>
				<div className="carousel-caption d-none d-md-block">
					<h5>Conversión instantánea y precisa</h5>
					<p>¿Operas en distintas monedas? No hay problema. Convierte al instante tus registros de Bolívares a Dólares. Mantén un seguimiento preciso sin complicaciones.</p>
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
