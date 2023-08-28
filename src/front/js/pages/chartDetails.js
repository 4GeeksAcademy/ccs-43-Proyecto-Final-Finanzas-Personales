import React from "react";
import axios from "axios";
// import React, { useState, useEffect, useContext } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler,ArcElement);
    
    export const CharDetail = () => {
  
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
                    label: 'Ingresos',
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
                    label: 'Egresos',
                    data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25]
                },
            ],
        };

       
       
    return (
    <div class="container row justify-content-center col-md-8 text-center"  >
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