import React from "react";
import axios from "axios";
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
        // BarsChart

        // PiesChart
        const options = {
            responsive : true,
            maintainAspectRatio: false,
        };

        const data = {
            labels: ['Carne', 'Jamón', 'Dulces', 'Turrón', 'Vino'],
            datasets: [
                {
                    label: 'Popularidad en Navidad',
                    data: [35, 20, 20, 15, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // PiesChart

    return (

    <div>
<div>
     {/* BarsChart */}
return <Bar data={midata} options={misoptions} />
</div>
<div>
{/* LinesChart */}
return <Line data={midata} options={misoptions}/>
</div>
<div>
{/* PiesChart */}
return <Pie data={data} options={options} />
</div>

    </div>
    )
}