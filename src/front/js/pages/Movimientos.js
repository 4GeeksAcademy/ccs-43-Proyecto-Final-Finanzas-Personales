import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/movimientos.css";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';


export const Movimientos = () => {
    const [fecha, setFecha] = useState('');
    const [tipo, setTipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [moneda, setMoneda] = useState('');
    const [monto, setMonto] = useState('');
    const [categoriasPorTipo, setCategoriasPorTipo] = useState({
      Ingresos: [],
      Egresos: [],
    });
  
    const { actions , store } = useContext(Context)
    const navigate = useNavigate()

    const handleTipoChange = (event) => {
      const selectedTipo = event.target.value;
      setTipo(selectedTipo);
      setCategoria('');
      setMoneda('');
      setMonto('');
    };
  
    const handleCategoriaChange = (event) => {
      setCategoria(event.target.value);
      setMoneda('');
      setMonto('');
    };
  
    const handleMonedaChange = (event) => {
      setMoneda(event.target.value);
      setMonto('');
    };
  
    const getConversionToDollar = async(monto) => {
      const API_URL = "https://pydolarvenezuela-api.vercel.app";
      const requestConfig = {
        method: "GET",
        headers: {
          "Content-type": "application/json", 
        },
      };

      try {
        const response = await fetch(API_URL + `/api/v1/dollar/td/${monto}/bcv`, requestConfig);
        if (response.status !== 200) {
          console.log("Error en la solicitud. Code: ", response.status);
          return null;
        }
        const responseBody = await response.json();
        return responseBody.value_to_dollar;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const handleSubmit = async(event) => {
      event.preventDefault();
      
      let montoFinal = monto;

      if (moneda === "Bolivares") {
        const montoDolares = await getConversionToDollar(monto);
        if (montoDolares === null) {
          console.log("Error en la conversión de Bolívares a Dólares");
          return;
        }
        console.log("Value to Dollar:", montoDolares);
        montoFinal = montoDolares.toFixed(2);
      }
    
      const data = {
        fecha: fecha,
        tipo: tipo,
        categoria: categoria,
        monto: montoFinal, 
      }; 
      
      console.log('Valores seleccionados:', data);

      try {
        const API_URL = process.env.BACKEND_URL;
        const requestConfig = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + store.token 
          },
          body: JSON.stringify(data)
        };
        const response = await fetch(API_URL + "/api/RegistroMovimientos", requestConfig);
        if (response.status !== 200) {
          console.log("Error en la solicitud. Code: ", response.status);
          return;
        }
        const responseBody = await response.json();
        console.log("API response:", responseBody);
      } catch (error) {
        console.log(error);
      }
    };
  
    
    useEffect(() => {
      const obtenerCategoriasDinamicas = async () => {
        try {
          const API_URL = process.env.BACKEND_URL;
          const response = await fetch(API_URL + "/api/ObtenerCategorias", {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          });
  
          if (response.status !== 200) {
            console.log("Error en la solicitud. Código: ", response.status);
            return;
          }
  
          const data = await response.json();
          const categorias = data.categories;
  
          const categoriasIngresos = categorias.filter(
            (cat) => cat.movement_type === "Ingresos"
          );
          const categoriasEgresos = categorias.filter(
            (cat) => cat.movement_type === "Egresos"
          );
  
          setCategoriasPorTipo({
            Ingresos: categoriasIngresos.map((cat) => cat.category),
            Egresos: categoriasEgresos.map((cat) => cat.category),
          });
        } catch (error) {
          console.log(error);
        }
      };
  
      obtenerCategoriasDinamicas();
    }, [store.token]);
  

    useEffect (() => {
      actions.checkLogin(navigate)
    },[])

    const limpiarCampos = () => {
      setFecha('');
      setTipo('');
      setCategoria('');
      setMoneda('');
      setMonto('');
    };

    const mostrarAlerta1 = () => {
      swal({
        title: 'Registro de movimiento',
        text: `Registro exitoso`,
        icon: 'success',
        timer: '3000'
      });
    }

    const ejecutarMetodos = () => {
      mostrarAlerta1(); // Ejecuta el primer método
      limpiarCampos(); // Ejecuta el segundo método
    }

    return (
      <div className="container-fluid containerDeRegistroM mx-auto p-2">
      <div className="container containerDeRegistroM2">
        <h2 id="tituloDeRegistroM" className="text-center mt-4 mb-5">Registro de Movimientos</h2>
        <form onSubmit={handleSubmit} className="formularioDeRegistroM mx-auto col-md-10">
          <div className="form-group">
            <input
              type="date"
              className="form-control border-0 border-bottom border-dark"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <select 
              className="form-control border-0 border-bottom border-dark" 
              value={tipo} 
              onChange={handleTipoChange}
              >
                <option value="">Selecciona un tipo</option>
                <option value="Ingresos">Ingresos</option>
                <option value="Egresos">Egresos</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <select 
              className="form-control border-0 border-bottom border-dark" 
              value={categoria} 
              onChange={handleCategoriaChange}
              >
                <option value="">Selecciona una categoría</option>
                {categoriasPorTipo[tipo]?.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <select 
              className="form-control border-radius-0 border-0 border-bottom border-dark" 
              value={moneda} 
              onChange={handleMonedaChange}
              >
                <option value="">Selecciona una moneda</option>
                <option value="Bolivares">Bolívares</option>
                <option value="Dolares">Dólares</option>
            </select>
              {moneda === 'Bolivares' && (
                <small className="text-muted">
                  Los montos ingresados en Bolívares se registrarán de modo automático en Dólares a la tasa BCV al momento de hacer el registro.
                </small>
              )}
          </div>
          <br />
          <div className="form-group">
            <input
              type="number"
              className="form-control border-0 border-bottom border-dark mb-2"
              placeholder="Registra un monto p.ej. 34.5"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <button  
              onClick={ejecutarMetodos} 
              type="submit" 
              disabled={!fecha, !tipo, !categoria, !moneda, !monto}
              className="botonDeRegistroM btn btn-secondary mx-auto mb-4"
              >
                Enviar
              </button>
          </div>
        </form>
      </div>
      </div>
    );
  }


