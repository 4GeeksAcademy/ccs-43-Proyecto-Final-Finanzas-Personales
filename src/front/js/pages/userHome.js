import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Chart, LineController, LinearScale, CategoryScale, PointElement, LineElement, Tooltip } from 'chart.js';
import "../../styles/UserHome.css"
import { Link, useNavigate } from "react-router-dom";

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Tooltip);

export const UserHome = () => {
    const { actions, store } = useContext(Context)
    const navigate = useNavigate()
    const { token } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const currentMonth = new Date().getMonth();
    const [totalIngresos, setTotalIngresos] = useState(0);
    const [totalGastos, setTotalGastos] = useState(0);
    const [saldoDisponible, setSaldoDisponible] = useState(0);

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

    const ingresosAgosto = [
		1200, 1500, 1800, 1600, 2000, 2500, 2200, 2300, 2500, 2800, 2600, 2900, 3000, 3200, 3400, 3500, 3700, 3800, 4000, 4200, 4300, 4500, 4700, 500, 400, 1500, 2000, 1000, 6200, 3000, 2500,
	  ];
	  const egresosAgosto = [
		800, 1000, 900, 1200, 1300, 1500, 1400, 1600, 1700, 1900, 2100, 3000, 2500, 2600, 2800, 3100, 2900, 3200, 2800, 3000, 1000, 1500, 2500, 500, 3200, 100, 2000, 3100, 2000, 1500, 1800,
	  ];

    const chartData = {
        labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
        datasets: [
            {
                label: "Ingresos",
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                data: ingresosAgosto,
            },
            {
                label: "Egresos",
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                data: egresosAgosto,
            },
        ],
    };

    useEffect (() => {
        actions.checkLogin(navigate)
      },[])

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        const ctx = document.getElementById("myChart").getContext("2d");

        const myChart = new Chart(ctx, {
            type: "line",
            data: chartData,
            options: chartOptions,
        });

        return () => {
            myChart.destroy();
        };
    }, []);

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