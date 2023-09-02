import React, { useState, useEffect, useContext }  from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Pie } from 'react-chartjs-2';
import { Link, useNavigate } from "react-router-dom";
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
      label: 'Ingresos',
      data: ingresos.map(data => data.monto),
      backgroundColor: generarColorPastelAleatorio(),
    },
    {
      label: 'Egresos',
      data: egresos.map(data => data.monto),
      backgroundColor: generarColorPastelAleatorio(),
    },
  ],
};


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <h1>Selecciona dos fechas</h1>
          <div>
            <label>Fecha de Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              className="form-control"
            />
          </div>
          <div>
            <label>Fecha de Fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={handleFechaFinChange}
              className="form-control"
            />
          </div>
          <div>
            <p>Fecha de Inicio seleccionada: {fechaInicio}</p>
            <p>Fecha de Fin seleccionada: {fechaFin}</p>
          </div>
          <div>
            <Pie data={data} options={options} />
            <div className="d-flex justify-content-between">
              <button onClick={miMetodo} className="btn btn-success">
                Buscar
              </button>
              <button type="submit" className="btn btn-danger">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
