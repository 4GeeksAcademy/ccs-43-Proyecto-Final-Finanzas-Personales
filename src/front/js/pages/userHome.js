import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import "../../styles/UserHome.css"
import { Link, useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const UserHome = () => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()
    const { token } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const currentMonth = new Date().getMonth();
    const [totalIngresos, setTotalIngresos] = useState(0);
    const [totalGastos, setTotalGastos] = useState(0);
    const [saldoDisponible, setSaldoDisponible] = useState(0);
    const [chartData, setChartData] = useState([]);

    const fetchUserData = async () => {
        const options = {
            headers: {
                "Authorization": "Bearer " + store.token,
            },
        }
        try {
            const response = await axios.get(
                process.env.BACKEND_URL + "/api/protected",
                options
            );
            setUserData(response.data);
            const registrosDinero = response.data.money_register;

            const totalIngresos = registrosDinero.reduce((total, transaccion) => {
                if (transaccion.tipo_movimiento === "Ingresos") {
                    return total + transaccion.monto;
                }
                return total;
            }, 0);
            
            const totalGastos = registrosDinero.reduce((total, transaccion) => {
                if (transaccion.tipo_movimiento === "Egresos") {
                    return total + transaccion.monto;
                }
                return total;
            }, 0);
            
            const saldoDisponible = totalIngresos - totalGastos;

            setTotalIngresos(totalIngresos);
            setTotalGastos(totalGastos);
            setSaldoDisponible(saldoDisponible);

        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    useEffect(() => {

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            const now = new Date();
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                return formatDate(date);
            });
    
            const data = last7Days.map(date => {
                const utcDate = new Date(date);
                const dailyIncomes = userData.money_register.reduce((total, transaction) => {
                    const transactionDate = new Date(transaction.time_selected);
                    if (transactionDate.toISOString().split('T')[0] === utcDate.toISOString().split('T')[0] &&
                        transaction.tipo_movimiento === "Ingresos") {
                        return total + transaction.monto;
                    }
                    return total;
                }, 0);
            
                const dailyExpenses = userData.money_register.reduce((total, transaction) => {
                    const transactionDate = new Date(transaction.time_selected);
                    if (transactionDate.toISOString().split('T')[0] === utcDate.toISOString().split('T')[0] &&
                        transaction.tipo_movimiento === "Egresos") {
                        return total + transaction.monto;
                    }
                    return total;
                }, 0);
            
                return {
                    date,
                    dailyIncomes,
                    dailyExpenses
                };
            });
            
    
            setChartData(data);
        }
    }, [userData]);
    
    function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    
    useEffect(() => {
        if (chartData.length > 0) {
            const ctx = document.getElementById("myChart").getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: chartData.map(data => data.date),
                    datasets: [
                        {
                            label: "Ingresos",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            data: chartData.map(data => data.dailyIncomes),
                        },
                        {
                            label: "Egresos",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            data: chartData.map(data => data.dailyExpenses),
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    useEffect (() => {
        actions.checkLogin(navigate)
      },[])

    return (
        <div className="container-fluid contarinerGeneralUserHomejs">
            <div className="presentationUserHome">
            {userData ? (
                <div>
                    <h2>Welcome, {userData.user_name}!</h2>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            </div>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Total ingresos:</strong></h6><i className="fa-solid fa-money-bill-trend-up" style={{color: "white"}}></i>
                </div>
                    <h1 id="sumatotaldemovimientosverde" className="sumatotaldemovimientos">$ {totalIngresos.toFixed(2)}</h1>
                {/* <h6>Total ingresos mes actual</h6> */}
            </div>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Total egresos:</strong></h6><i className="fa-solid fa-arrow-trend-down" style={{color: "white"}}></i>
                </div>
                <h1 id="sumatotaldemovimientosrojo" className="sumatotaldemovimientos">$ {totalGastos.toFixed(2)}</h1>
                {/* <h6>Total ingresos mes actual</h6> */}
            </div>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <h6 className="h6NicoUserHomejs"><strong>Saldo disponible:</strong></h6><i className="fa-solid fa-sack-dollar" style={{color: "white"}}></i>
                </div>
                <h1 id="sumatotaldemovimientosamarillo" className="sumatotaldemovimientos">$ {saldoDisponible.toFixed(2)}</h1>
            </div>
            <div className="container containerDeUsreHomejsonelinea">
                <div className="mininavbarUserHome">
                    <p className="h6NicoUserHomejs"><strong>Valor del $ hoy:</strong></p><i className="fa-solid fa-dollar-sign" style={{color: "white"}}></i>
                </div>
            </div>
            <div className="container containerDechartHomejs">
                {/* <h3 className="pdegrafica1Nico">Observa diariamente como se mueven tus estadísticas del mes actual!</h3> */}
                <canvas id="myChart" width="5vh" height="3vh"></canvas>
            </div>
            
            <div className="container containerDeUsreHomejs">
            </div>
            <div className="container containerDeUsreHomejs">
            </div>
            <div className="container containerDeUsreHomejs">
            </div>
            <div className="container containerDeUsreHomejs">
            </div>
        </div>
    );
};