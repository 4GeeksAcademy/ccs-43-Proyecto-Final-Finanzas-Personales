import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Ingresos = () => {
    const { actions , store } = useContext(Context)
    const navigate = useNavigate()

    useEffect (() => {
        actions.checkLogin(navigate)
      },[])
    
    return (
        <h1 className="prueba text-center mt-5 p-5">Aqui se reflejaran los ingresos</h1>
    )    
}




