import React, { useState, useEffect, useContext }  from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js/auto';
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

export const CharDetail = () => {
  const { actions, store } = useContext(Context);
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
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(0, 220, 195)',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: resultadoFilter.map(data => data.tipo_categoria),
    datasets: [
      {
        label: '',
        data: resultadoFilter.map(data => data.monto),
      }
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
