import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/movimientos.css";
import { Link } from "react-router-dom";

export const Movimientos = () => {
    const [tipo, setTipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [moneda, setMoneda] = useState('');
    const [monto, setMonto] = useState('');
  
    const handleTipoChange = (event) => {
      setTipo(event.target.value);
      setCategoria('');
    };
  
    const handleCategoriaChange = (event) => {
      setCategoria(event.target.value);
    };
  
    const handleMonedaChange = (event) => {
      setMoneda(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      //realizar acciones con los valores seleccionados (tipo, categoria, moneda, monto)
      console.log('Valores seleccionados:', tipo, categoria, moneda, monto);
    };
  
    const renderCategoriaOptions = () => {
      if (tipo === 'Ingresos') {
        return (
          <select className="form-control" value={categoria} onChange={handleCategoriaChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Salario">Salario</option>
            <option value="Depósito">Depósito</option>
            <option value="Inversiones">Inversiones</option>
          </select>
        );
      } else if (tipo === 'Egresos') {
        return (
          <select className="form-control" value={categoria} onChange={handleCategoriaChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Pago de servicios">Pago de servicios</option>
            <option value="Alimentación">Alimentación</option>
            <option value="Salud y medicinas">Salud y medicinas</option>
            <option value="Hogar">Hogar</option>
            <option value="Ocio">Ocio</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Carro">Carro</option>
            <option value="Deporte">Deporte</option>
            <option value="Ropa">Ropa</option>
          </select>
        );
      } else {
        return null;
      }
    };
  
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
          <div className="form-group">
            <label>Categoría:</label>
            {renderCategoriaOptions()}
          </div>
          {categoria && (
            <div className="form-group">
              <label>Moneda:</label>
              <select className="form-control" value={moneda} onChange={handleMonedaChange} required>
                <option value="">Selecciona una moneda</option>
                <option value="Bolivares">Bolívares</option>
                <option value="Dolares">Dólares</option>
              </select>
            </div>
          )}
          {moneda && (
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
          )}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    );
  }