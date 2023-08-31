import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TypeOfCategories.css"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const TypesOfCategories = () => {
    const [tipo, setTipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleTipoChange = (event) => {
        setTipo(event.target.value);
        setCategoria('');
    };
    
    const fetchCategories = async () => {
      try {
          const API_URL = process.env.BACKEND_URL;
          const response = await fetch(API_URL + "/api/ObtenerCategorias", {
              headers: {
                  "Authorization": "Bearer " + store.token 
              }
          });

          if (response.status !== 200) {
              console.log("Error en la solicitud. Código: ", response.status);
              return;
          }

          const data = await response.json();
          console.log("Datos de la API:", data);
          setCategorias(data.categories);
      } catch (error) {
          console.log(error);
      }
  };
  
  const handleDelete = async (categoryId) => {
    try {
        const API_URL = process.env.BACKEND_URL;
        const response = await fetch(API_URL + `/api/EliminarCategoria/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + store.token 
            }
        });

        if (response.status !== 200) {
            console.log("Error en la solicitud. Código: ", response.status);
            return;
        }

        await fetchCategories();
    } catch (error) {
        console.log(error);
    }
};

 const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
        tipo: tipo,
        categoria: categoria
    }; 
    
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
        const response = await fetch(API_URL + "/api/RegistroCategorias", requestConfig);
        if (response.status !== 201) {
            console.log("Error en la solicitud. Código: ", response.status);
            return;
        }
        const responseBody = await response.json();
        console.log("Respuesta de la API:", responseBody);

        fetchCategories();
        
        setTipo('');
        setCategoria('');
    } catch (error) {
        console.log(error);
    }
};
  
    useEffect (() => {
      actions.checkLogin(navigate)
      fetchCategories()
    },[])

    return (
        <div className="container containerDeTypeOfCategories">
            <h2>Personaliza tus categorías!</h2>
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
                    <input
                        type="text"
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
            <div className="mt-4">
                <h2>Registros de Categorías</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Categoría</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3"><strong>Ingresos</strong></td>
                        </tr>
                        {categorias.map((cat) => (
                            cat.movement_type === "Ingresos" && (
                                <tr key={cat.id}>
                                    <td>{cat.movement_type}</td>
                                    <td>{cat.category}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(cat.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                        <tr>
                            <td colSpan="3"><strong>Egresos</strong></td>
                        </tr>
                        {categorias.map((cat) => (
                            cat.movement_type === "Egresos" && (
                                <tr key={cat.id}>
                                    <td>{cat.movement_type}</td>
                                    <td>{cat.category}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(cat.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
