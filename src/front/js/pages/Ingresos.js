import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Ingresos = () => {
    const { store, actions } = useContext(Context);
    const [ingresos, setIngresos] = useState([]);
    const navigate = useNavigate();

    const fetchIngresos = async () => {
        try {
            const API_URL = process.env.BACKEND_URL;
            const response = await fetch(API_URL + "/api/ObtenerIngresos", {
                headers: {
                    "Authorization": "Bearer " + store.token
                }
            });

            if (response.status !== 200) {
                console.log("Error en la solicitud. Código: ", response.status);
                return;
            }

            const data = await response.json();
            setIngresos(data.ingresos);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (ingresoId) => {
        if (!ingresoId || typeof ingresoId !== 'number' || isNaN(ingresoId)) {
            console.log("ID de ingreso no válido");
            return;
        }
        try {
            const API_URL = process.env.BACKEND_URL;
            const response = await fetch(API_URL + `/api/EliminarIngreso/${ingresoId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + store.token
                }
            });
    
            if (response.status !== 200) {
                console.log("Error en la solicitud. Código: ", response.status);
                return;
            }
    
            await fetchIngresos();
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
        fetchIngresos();
    }, []);

    const sortIngresosByDate = (ingresos) => {
        return ingresos.sort((a, b) => {
            const dateA = new Date(a.time_selected);
            const dateB = new Date(b.time_selected);
            return dateB - dateA;
        });
    };

    return (
        <div className="container mt-25">
            <h2>Ingresos</h2>
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
                    {sortIngresosByDate(ingresos).map((ingreso) => (
                        <tr key={ingreso.id}>
                            <td>{formatDate(ingreso.time_selected)}</td>
                            <td>{ingreso.tipo_movimiento}</td>
                            <td>{ingreso.tipo_categoria}</td>
                            <td>{ingreso.monto}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(ingreso.id)}
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
