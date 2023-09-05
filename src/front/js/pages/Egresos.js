import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        actions.checkLogin(navigate);
        fetchEgresos();
    }, []);

    return (
        <div className="container">
            <h2>Egresos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha de Registro</th>
                        <th>Tipo de Movimiento</th>
                        <th>Tipo de Categoría</th>
                        <th>Monto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {egresos.map((egreso) => (
                        <tr key={egreso.id}>
                            <td>{formatDate(egreso.time_selected)}</td>
                            <td>{egreso.tipo_movimiento}</td>
                            <td>{egreso.tipo_categoria}</td>
                            <td>{egreso.monto}</td>
                            <td>
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
    );
};