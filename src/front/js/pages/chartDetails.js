import React, { useState, useEffect, useContext }  from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Pie } from 'react-chartjs-2';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/chartDetails.css"
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js/auto';
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export const CharDetail = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate()
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [userData, setUserData] = useState(null);
  const [resultadoFilter, setResultadoFilter] = useState([]);
  console.log(resultadoFilter,"resultadoFilter")

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
    actions.checkLogin(navigate)
  }, []);

  const moneyRegister = userData ? userData.money_register : [];

  const datosUnificados = {};
  for (const dato of moneyRegister) {
    if (datosUnificados[dato.tipo_categoria]) {
      datosUnificados[dato.tipo_categoria].monto += dato.monto;
    } else {
      datosUnificados[dato.tipo_categoria] = {
        monto: dato.monto,
        time_selected: dato.time_selected,
        tipo_categoria: dato.tipo_categoria,
        tipo_movimiento: dato.tipo_movimiento,
      };
    }
  }

  const resultado = Object.values(datosUnificados);

  const miMetodo = () => {
    const filtrado = resultado.filter(evento => {
      const eventTime = new Date(evento.time_selected);
      const tempFechaInicio = new Date(fechaInicio);
      const tempFechaFin = new Date(fechaFin);
      return eventTime >= tempFechaInicio && eventTime <= tempFechaFin;
    });
    setResultadoFilter(filtrado);
  };


  function generarColorPastelAleatorio() {
    // Genera valores aleatorios para los componentes de color (rojo, verde, azul y alfa)
    const r = Math.floor(Math.random() * 156 + 100); // Valores entre 100 y 255 para colores pastel
    const g = Math.floor(Math.random() * 156 + 100);
    const b = Math.floor(Math.random() * 156 + 100);
    const a = Math.random() * 0.4 + 0.6; // Valores de opacidad entre 0.6 y 1.0
  
    // Crea el color RGBA en formato CSS
    const colorRGBA = `rgba(${r}, ${g}, ${b}, ${a})`;
  
    return colorRGBA;
  }
  
  // Ejemplo de uso
  const colorAleatorio = generarColorPastelAleatorio();

  
  const options = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        min: -25,
        max: 100,
        grid: {
          color: generarColorPastelAleatorio(), // Generar un color aleatorio aquí
        },
      },
      x: {
        ticks: {
          color: generarColorPastelAleatorio(), // Generar un color aleatorio aquí
          font: {
            size: 12,
          },
        },
      },
    },
  };


  const ingresos = resultadoFilter.filter(data => data.tipo_movimiento === 'Ingresos');
const egresos = resultadoFilter.filter(data => data.tipo_movimiento === 'Egresos');


const data = {
  labels: [...ingresos.map(data => data.tipo_categoria), ...egresos.map(data => data.tipo_categoria)],
  datasets: [
    
    {
      label: 'Egresos',
      data: egresos.map(data => data.monto),
      backgroundColor: generarColorPastelAleatorio(),
    },
    {
      label: 'Ingresos',
      data: ingresos.map(data => data.monto),
      backgroundColor: generarColorPastelAleatorio(),
    }
  ],
};

const mostrarAlerta1 = () => {
  swal({
    title: 'Fechas',
    text: `¿Está seguro de que este es el rango que quiere? ${fechaInicio} - ${fechaFin}`,
    icon: 'success',
    buttons: ["No", "Si"],
  }).then(respuesta => {
    if (respuesta) {
      miMetodo(); // Llama a tu función miMetodo si el usuario hace clic en "Sí"
    } else {
      swal({ text: "Escoja su nuevo rango de fechas" });
    }
  });
}



  return (
<div className="container containerDefinitivoRuben">
      <h1 className="h1rubenSuperDfinitivo">Selecciona dos fechas</h1>
<div className="container-fluid containerChartDetailRuben">
  <div className="date-section">
    <div className="date-picker">
        <div className="date-input">
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            className="form-control form-control-large"
            style={{ width: '200px' }}
          />
        </div>
        <div className="date-input">
          <label htmlFor="fechaFin">Fecha de Fin:</label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={handleFechaFinChange}
            className="form-control form-control-large"
            style={{ width: '200px' }}
          />
      </div>
  </div>
  <div className="button-container">






    
    <button onClick={mostrarAlerta1} className="btn btn-success" style={{ backgroundColor: '#4180ab' }}>
      Buscar
    </button>
  </div>
</div>
  <div className="chart-section">
    <div className="chart-container">
      {/* <canvas id="myChart" width="100vh" height="50vh"></canvas> */}
      <Pie data={data} options={options} />
    </div>
  </div>
</div> 
</div>
  );
};
