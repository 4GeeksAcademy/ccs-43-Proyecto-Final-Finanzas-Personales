import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Ingresos&Egresos.css"

export const Egresos = () => {
    const { store, actions } = useContext(Context);
    const [egresos, setEgresos] = useState([]);
    const navigate = useNavigate();

    const fetchEgresos = async () => {
        try {
            const API_URL = process.env.BACKEND_URL;
            const response = await fetch(API_URL + "/api/ObtenerEgresos", {
                headers: {
                    "Authorization": "Bearer " + store.token
                }
            });

            if (response.status !== 200) {
                console.log("Error en la solicitud. Código: ", response.status);
                return;
            }

            const data = await response.json();
            setEgresos(data.egresos);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (egresoId) => {
        if (!egresoId || typeof egresoId !== 'number' || isNaN(egresoId)) {
            console.log("ID de egreso no válido");
            return;
        }
        try {
            const API_URL = process.env.BACKEND_URL;
            const response = await fetch(API_URL + `/api/EliminarEgreso/${egresoId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + store.token
                }
            });

            if (response.status !== 200) {
                console.log("Error en la solicitud. Código: ", response.status);
                return;
            }

            await fetchEgresos();
            mostrarAlerta3()
            
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        actions.checkLogin(navigate);
        fetchEgresos();
    }, []);

    const sortEgresosByDate = (egresos) => {
        return egresos.sort((a, b) => {
            const dateA = new Date(a.time_selected);
            const dateB = new Date(b.time_selected);
            return dateB - dateA;
        });
    };

    const mostrarAlerta3 = () => {
        swal({
            title: 'Listado de Egresos',
            text: `Egreso Eliminado`,
            icon: 'success',
            timer: '3000',
          buttons: {
            yes: {
              text: "Si",
              value: true,
              className: "custom-button-yes",
            },
          },
          customClass: {
            modal: 'custom-modal', 
          },
        })
      };

    return (
        <div className="container containerIngresosNicoSuper">
            <div className="containerTituloIngresosyEgresosNico">
                <h2><i className="fa-solid fa-arrow-trend-down iconEgresosEgresosNico" style={{color: "black"}}></i>Egresos</h2>
            </div>
            <div className="table-responsive">
                <table className="table custom-table">
                    <thead style={{background: "RGBA(255, 60, 102, 0.4)"}}>
                        <tr>
                            <th className="custom-header">Fecha</th>
                            <th className="custom-header">Movimiento</th>
                            <th className="custom-header">Categoría</th>
                            <th className="custom-header">Monto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortEgresosByDate(egresos).map((egreso) => (
                            <tr key={egreso.id} className="custom-row">
                                <td className="custom-cell">{formatDate(egreso.time_selected)}</td>
                                <td className="custom-cell">{egreso.tipo_movimiento}</td>
                                <td className="custom-cell">{egreso.tipo_categoria}</td>
                                <td className="custom-cell">{egreso.monto}</td>
                                <td className="custom-cell">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(egreso.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};