import React, { useState, useEffect, useContext }  from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler,ArcElement);
    
    export const CharDetail = () => {
    const { actions, store } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [userData, setUserData] = useState(null);
    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
      };
      const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
      };

console.log(fechaInicio, fechaFin , "fechas")

const dataReal = [
    {
      "id": 1,
      "user": "snay208@gmail.com",
      "tipoMovimiento" : 1,
      "tipoCategoria" : 3,
      "fecha": "2023-08-28 14:13:19+00:00"
    },
    {
      "id": 2,
      "user": "snay208@gmail.com",
      "tipoMovimiento" : 1,
      "tipoCategoria" : 3,
      "fecha": "2023-08-20 14:13:19+00:00"
    },
    {
      "id": 3,
      "user": "snay208@gmail.com",
      "tipoMovimiento" : 1,
      "tipoCategoria" : 3,
      "fecha": "2022-08-28 14:13:19+00:00"
    },
    {
      "id": 4,
      "user": "snay208@gmail.com",
      "tipoMovimiento" : 1,
      "tipoCategoria" : 3,
      "fecha": "2020-08-28 14:13:19+00:00"
    }
  ]
  
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
        console.log(response.data.money_register)
    } catch (error) {
        console.error("Error fetching user data", error);
    }
};



  const filtrado = dataReal.filter(evento => {
    return evento.fecha >= fechaInicio && evento.fecha <= fechaFin;
  });
  
  console.log(filtrado);




        // BarsChart
        const ingresos = [72, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        const misoptions = {
            responsive : true,
            animation : false,
            plugins : {
                legend : {
                    display : false
                }
            },
            scales : {
                y : {
                    min : -25,
                    max : 100
                },
                x: {
                    ticks: { color: 'rgba(0, 220, 195)'}
                }
            }
        };
        
        const midata = {
            labels: meses,
            datasets: [ // Cada una de las líneas del gráfico
                {
                    label: 'Ingresos',
                    data: ingresos,
                    tension: 0.5,
                    fill : true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
                {
                    label: 'Egresos',
                    data: [50,100]
                },
            ],
        };

       
       
    return (
    <div class="container row justify-content-center col-md-8 text-center"  >

<h1>Selecciona dos fechas</h1>
        <div>
        <label>Fecha de Inicio:</label>
        <input
            type="date"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
        />
        </div>
        <div>
        <label>Fecha de Fin:</label>
        <input
            type="date"
            value={fechaFin}
            onChange={handleFechaFinChange}
        />
        </div>
        <div>
        <p>Fecha de Inicio seleccionada: {fechaInicio}</p>
        <p>Fecha de Fin seleccionada: {fechaFin}</p>
        </div>

        <div>
            <Pie data={midata} options={misoptions} />
        </div>
    </div>
    )
}