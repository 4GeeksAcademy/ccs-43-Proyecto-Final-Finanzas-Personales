import React from "react";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler,ArcElement);
    
    export const CharDetail = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
      };
    
      const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
      };


  
        // BarsChart
        const beneficios = [72, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
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
                    label: 'Beneficios',
                    data: beneficios,
                    tension: 0.5,
                    fill : true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
                {
                    label: 'Otra línea',
                    data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
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
            <Bar data={midata} options={misoptions} />
        </div>
        <div>
            <Line data={midata} options={misoptions}/>
        </div>
        <div>
            <Pie data={midata} options={misoptions} />
        </div>
    </div>
    )
}