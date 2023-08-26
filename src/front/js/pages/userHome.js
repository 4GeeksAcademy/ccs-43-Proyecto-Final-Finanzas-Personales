import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Chart, LineController, LinearScale, CategoryScale, PointElement, LineElement, Tooltip } from 'chart.js';
import "../../styles/UserHome.css"
import { Link, useNavigate } from "react-router-dom";

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Tooltip);

export const UserHome = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    // const { token } = useContext(Context);
    // const [userData, setUserData] = useState(null);
    const currentMonth = new Date().getMonth();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get(
    //                 process.env.BACKEND_URL + "/api/protected",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //             setUserData(response.data.user);
    //         } catch (error) {
    //             console.error("Error fetching user data", error.response.data);
    //         }
    //     };

    //     fetchUserData();
    // }, [token]);

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
        <div className="container-fluid">
            {/* {userData ? (
                <div>
                    <h2>Welcome, {userData.user_name}!</h2>
                    <p>Full Name: {userData.first_name} {userData.last_name}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )} */}
            <div className="container containerDeUsreHomejs">
                <canvas id="myChart" width="5vh" height="3vh"></canvas>
            </div>

        </div>
    );
};