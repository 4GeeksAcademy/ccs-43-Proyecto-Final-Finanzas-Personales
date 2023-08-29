import React from "react";
import "../../styles/nosotros.css";



export const Nosotros = () => {
    return (
        <div className="containerPrincipalNosotros">
            <h1 className="containerNosotros text-center mt-5 mb-5">Sobre Nosotros</h1>
            <div className="names d-flex"> 
                <h5 className="name">Nicolás Yanez</h5>
                <h5 className="name">Ruben Reyes</h5>
                <h5 className="name">Leonardo Pérez-Castilla</h5>
            </div>
            <h3 className="containerWR text-center mt-5 mb-3"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693002236/rzis5kfsadg4tsrpc22j.png" className="wr"></img></h3>
            <h3 className="containerTecnologias text-center mt-5 mb-3">Tecnologías</h3>
                <div className="logo-container mt-4 mb-3">
                    <div className="logo-row mb-3">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269073/html_slnwee.png" className="icon" alt="HTML Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269078/css3_bit3fz.png" className="icon" alt="CSS Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269115/bootstrap_aiuuuw.png" className="icon" alt="Bootstrap Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269111/javascript_ebr6td.png" className="icon" alt="JavaScript Logo"/></span>
                    </div>
                    <div className="logo-row mt-3">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269107/react_vnhobk.png" className="icon" alt="React Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269097/postgresql_jp7vii.png" className="icon" alt="PostgreSQL Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269086/flask_yi0gfl.png" className="icon" alt="Flask Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269082/python_kygkmg.png" className="icon" alt="Python Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269069/chart-removebg-preview_jvqkvr.png" className="icon" alt="Chart Logo"/></span>
                    </div>
                </div>
            <h3 className="containerProyeccion text-center mt-5 mb-3">Proyección</h3>
        </div>
    )
}

