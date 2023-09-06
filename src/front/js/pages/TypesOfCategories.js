import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TypeOfCategories.css"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


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
    
    const mostrarAlerta1 = () => {
        swal({
          title: 'Registro de Categoria',
          text: `Se agrego esta categoria`,
          icon: 'success',
          timer: '500'
        });
      }

      const placeholderText = tipo === "" ? "Escoge un tipo de categoría" : (tipo === "Ingresos" ? "Tipo de Ingreso. Ejemplo: Salario" : "Tipo de Egreso. Ejemplo: Medicinas");

    return (
        <div className="container containerDeTypeOfCategories">
            <div className="container containerNicoTypeOfCategoriesprimero">
                <div className="container containerlapiztypesofcategoriesNico">
                    <i className="fa-solid fa-user-pen"></i>
                    <h5 className="TituloTypesOfCategories">Personaliza tus categorías</h5>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select className="inputDeLogin" placeholder="Selecciona Tipo de Categoría" value={tipo} onChange={handleTipoChange} required>
                        <option disabled value="">Selecciona un tipo de Categoría</option>
                        <option value="Ingresos">Ingresos</option>
                        <option value="Egresos">Egresos</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="text"
                        className="inputDeLogin"
                        placeholder={placeholderText}
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <button onClick={mostrarAlerta1} type="submit" className="btn btn-dark buttonCargadeDatosDeLogin">Enviar<i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </form>
            </div>
            <div className="container containerRegistroCategoriesNicoTypeOfCategories">
                <div className="container containerlapiztypesofcategoriesNico">
                    <i class="fa-solid fa-pencil"></i>
                    <h5 className="TituloTypesOfCategories">Registro de Categorías</h5>
                </div>
                <table className="table tableNicoTypesOfCategories">
                    <thead className="HeadTableNicoTypesOfCategories">
                        <tr>
                            <th>Tipo</th>
                            <th>Categoría</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="EgresosTypesOfCategoriesTablaback">
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
                        <tr className="IngresosTypesOfCategoriesTablaback">
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
