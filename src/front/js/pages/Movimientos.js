import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/movimientos.css";
import { Link, useNavigate } from "react-router-dom";

const categoriesByType = {
  Ingresos: ['Salario', 'Depósito', 'Inversiones'],
  Egresos: ['Pago de servicios', 'Alimentación', 'Salud y medicinas', 'Hogar', 'Ocio', 'Gasolina', 'Carro', 'Deporte', 'Ropa']
};

export const Movimientos = () => {
    const [tipo, setTipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [moneda, setMoneda] = useState('');
    const [monto, setMonto] = useState('');
  
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
  
    const handleSubmit = async(event) => {
      event.preventDefault();

      //const montoDolares = funcionConversion()
      //if (moneda = "Bolivares")

      const data = {
        tipo: tipo,
        categoria: categoria,
        monto: monto,
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
  
    useEffect (() => {
      actions.checkLogin(navigate)
    },[])

    return (
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo:</label>
            <select className="form-control" value={tipo} onChange={handleTipoChange} required>
              <option value="">Selecciona un tipo</option>
              <option value="Ingresos">Ingresos</option>
              <option value="Egresos">Egresos</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Categoría:</label>
            <select className="form-control" value={categoria} onChange={handleCategoriaChange} required>
              <option value="">Selecciona una categoría</option>
              {categoriesByType[tipo]?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Moneda:</label>
            <select className="form-control" value={moneda} onChange={handleMonedaChange} required>
              <option value="">Selecciona una moneda</option>
              <option value="Bolivares">Bolívares</option>
              <option value="Dolares">Dólares</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Monto:</label>
            <input
              type="number"
              className="form-control"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    );
  }
  