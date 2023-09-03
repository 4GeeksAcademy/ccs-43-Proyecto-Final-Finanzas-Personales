import React from "react";
import "../../styles/nosotros.css";
import 'animate.css'


export const Nosotros = () => {
    return (
        <div className="container principalNosotros">
            <div className="container names d-flex justify-content-center mb-5">
                <div className="row">   
                    <div className="col-12 col-md-4 animate__animated animate__headShake">
                        <img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693696394/Beige_Simple_Photo_Signature_Twitter_Profile_Picture_hkaj6b.png" className="leo img-fluid" alt="Photo" />
                    </div>
                    <div className="col-12 col-md-4 animate__animated animate__headShake">
                        <img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693696394/Beige_Simple_Photo_Signature_Twitter_Profile_Picture_1_o6g1iu.png" className="nico img-fluid" alt="Photo" />
                    </div>
                    <div className="col-12 col-md-4 animate__animated animate__headShake">
                        <img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693767896/Beige_Simple_Photo_Signature_Twitter_Profile_Picture_2_aimkro.png" className="ruben img-fluid" alt="Photo" />
                    </div>
                </div>
            </div>
            <div className="container tech d-inline-flex justify-content-center align-items-center mt-5 mb-5">
                <h3 className="container tecnologias col-md-5 col-12 text-center">Tecnologías</h3>
                <div className="container logo col-md-7 col-12 mt-4 mb-3">
                    <div class="logo-row justify-content-center mb-3">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269073/html_slnwee.png" className="icon" alt="HTML Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269078/css3_bit3fz.png" className="icon" alt="CSS Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269115/bootstrap_aiuuuw.png" className="icon" alt="Bootstrap Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269111/javascript_ebr6td.png" className="icon" alt="JavaScript Logo"/></span>
                    </div>
                    <div className="logo-row justify-content-center mt-3">
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269107/react_vnhobk.png" className="icon" alt="React Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269097/postgresql_jp7vii.png" className="icon" alt="PostgreSQL Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269086/flask_yi0gfl.png" className="icon" alt="Flask Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269082/python_kygkmg.png" className="icon" alt="Python Logo"/></span>
                        <span className="logo"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693269069/chart-removebg-preview_jvqkvr.png" className="icon" alt="Chart Logo"/></span>
                    </div>
                </div>
            </div>
            <div className="container proyeccion d-inline-flex justify-content-center align-items-center mb-5">
                <h3 className="container titulo col-md-5 col-12">Proyección</h3>
                <div className="container roadmap col-md-7 col-12 mt-4 mb-3">
                    <span className="roadmap"><img src="https://res.cloudinary.com/dronv3ars/image/upload/v1693768156/Five_Rectangle_Flow_Diagram_Graph_1_qc9bv0.png" className="iconroadmap" alt="map"/></span>
                </div>
            </div>
    </div>
    )
}

