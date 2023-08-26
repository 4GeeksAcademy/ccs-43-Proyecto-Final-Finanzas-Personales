import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";

import Layout from "./layout";
import LayoutUser from "./layoutUser";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const {store} = useContext(Context)
  // console.log(store)
  useEffect(() =>{
    if( token == null  && localStorage.getItem("token") != null){
      setToken(localStorage.getItem("token")) 
    }
  },[token])  
  
  return (
    <React.StrictMode>
      {token ? (
        <LayoutUser />
      ) : (
        <Layout setToken = { setToken } />
      )}
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
