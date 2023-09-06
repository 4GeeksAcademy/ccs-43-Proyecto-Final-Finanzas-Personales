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

  const miMetodo = () => {
    const filtrado = moneyRegister.filter(evento => {
      const eventTime =  formatDateForTable(evento.time_selected);
      const tempFechaInicio = formatDateForTable(fechaInicio);
      const tempFechaFin = formatDateForTable(fechaFin);
      return eventTime >= tempFechaInicio && eventTime <= tempFechaFin;
    });
    setResultadoFilter(filtrado);
  };

  const generarColorPastelAleatorio = () => {
    const r = Math.floor(Math.random() * 156 + 100);
    const g = Math.floor(Math.random() * 156 + 100);
    const b = Math.floor(Math.random() * 156 + 100);
    const a = Math.random() * 0.4 + 0.6;
    const colorRGBA = `rgba(${r}, ${g}, ${b}, ${a})`;
    return colorRGBA;
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
          color: generarColorPastelAleatorio(),
        },
      },
      x: {
        ticks: {
          color: generarColorPastelAleatorio(),
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const ingresos = resultadoFilter.filter(data => data.tipo_movimiento === 'Ingresos');
const egresos = resultadoFilter.filter(data => data.tipo_movimiento === 'Egresos');

// Obtener todas las categorías únicas
const allCategories = [...new Set(resultadoFilter.map(data => data.tipo_categoria))];

// Calcular los montos para ingresos y egresos para cada categoría
const ingresosData = allCategories.map(category => {
  const filteredData = ingresos.filter(data => data.tipo_categoria === category);
  return filteredData.reduce((total, data) => total + data.monto, 0);
});

const egresosData = allCategories.map(category => {
  const filteredData = egresos.filter(data => data.tipo_categoria === category);
  return filteredData.reduce((total, data) => total + data.monto, 0);
});

const data = {
  labels: allCategories,
  datasets: [
    {
      label: 'Egresos',
      data: egresosData,
      backgroundColor: egresosData.map(() => generarColorPastelAleatorio()),
    },
    {
      label: 'Ingresos',
      data: ingresosData,
      backgroundColor: ingresosData.map(() => generarColorPastelAleatorio()),
    },
  ],
};

  const mostrarAlerta1 = () => {
    swal({
      title: 'Fechas',
      text: `¿Está seguro de que este es el rango que quiere? ${fechaInicio} - ${fechaFin}`,
      icon: 'success',
      buttons: {
        no: {
          text: "No",
          value: false,
          className: "custom-button-no",
        },
        yes: {
          text: "Si",
          value: true,
          className: "custom-button-yes",
        },
      },
      
      customClass: {
        modal: 'custom-modal', 
      },
    }).then((respuesta) => {
      if (respuesta) {
        miMetodo();
      } else {
        swal({ text: "Escoja su nuevo rango de fechas" });
      }
    });
  };
  

  const formatDateForTable = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

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
                style={{ width: '100%' }} // Cambiar a 100% para dispositivos móviles
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
                style={{ width: '100%' }} // Cambiar a 100% para dispositivos móviles
              />
            </div>
          </div>
          <div>
            <button onClick={mostrarAlerta1} className=" botonDeBusqueda btn btn-secondary mx-auto mb-4"
             disabled={!fechaInicio || !fechaFin}
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="chart-section">
          <div className="chart-container" style={{ width: '90%', height: '90%' }}>
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
