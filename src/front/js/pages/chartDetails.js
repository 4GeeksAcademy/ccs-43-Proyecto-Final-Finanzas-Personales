import React, { useState, useEffect, useContext }  from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js/auto';
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

    export const CharDetail = () => {
    const { actions, store } = useContext(Context)
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [userData, setUserData] = useState(null);
    const [resultadoFilter, setResultadoFilter] = useState([]);
    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
      };
      const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
      };

     

console.log(fechaInicio, fechaFin , "fechas")
const dataReal =[
    {
        "monto": 308,
        "time_selected": "Thu, 17 Aug 2023 00:00:00 GMT",
        "tipo_categoria": "Salario",
        "tipo_movimiento": "Ingresos"
    },
    {
        "monto": 50,
        "time_selected": "Wed, 30 Aug 2023 00:00:00 GMT",
        "tipo_categoria": "Salud y medicinas",
        "tipo_movimiento": "Egresos"
    },
    {
        "monto": 5000,
        "time_selected": "Wed, 30 Aug 2023 00:00:00 GMT",
        "tipo_categoria": "Salario",
        "tipo_movimiento": "Ingresos"
    }
]

  
const fetchUserData = async () => {
    const options = {
      headers: {
        "Authorization": "Bearer " + store.token,
      },
    };
    try {
      const response = await axios.get(
        process.env.BACKEND_URL + "/api/protected",
        options
      );
      setUserData(response.data);
      console.log(response.data.money_register);
    } catch (error) {
      console.error("Error fetching user data", error);
      // Aquí puedes mostrar un mensaje de error al usuario o tomar alguna otra acción
    }
  };
  

  const datosUnificados = {};
  for (const dato of dataReal) {
    if (datosUnificados[dato.tipo_categoria]) {
      datosUnificados[dato.tipo_categoria].monto += dato.monto;
    } else {
      datosUnificados[dato.tipo_categoria] = {monto: dato.monto, time_selected : dato.time_selected,tipo_categoria: dato.tipo_categoria , tipo_movimiento: dato.tipo_movimiento };
    }
  }
  
  const resultado = Object.values(datosUnificados);





  const miMetodo = () => {
    console.log('El botón fue clicado y el método fue ejecutado.');
    
    const filtrado = resultado.filter(evento => {
      return evento.time_selected >= fechaInicio && evento.time_selected <= fechaFin;
    });
    
    setResultadoFilter(filtrado);
    
    console.log(resultadoFilter);
  };
  

        // BarsChart
        const misoptions = {
            responsive : true,
            animation : true,
            plugins : {
                legend : {
                    display : true
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
            labels: resultadoFilter.map(data => data.tipo_categoria),
            datasets: [ // Cada una de las líneas del gráfico
                {
                    label: '',
                    data:resultadoFilter.map(data => data.monto),
                    // tension: 1,
                    // fill : false,
                    // backgroundColor: dataReal.map(data => data.tipo_movimiento) == 'Egresos' ? blue : "rgba(255, 99, 132, 0.2)",
                }
            ],
        };
       
    return (
    <div class=" container row justify-content-center col-md-4"  >
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
            <div class="d-flex justify-content-between">
            <button onClick={miMetodo} class="btn btn-primary">Buscar</button>
            <button type="submit" class="btn btn-primary">Cancelar</button>
            </div>

        </div>
    </div>
    )
}