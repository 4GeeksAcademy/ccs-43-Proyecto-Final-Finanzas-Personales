import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";

import Layout from "./layout";
import LayoutUser from "./layoutUser";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <React.StrictMode>
      {token ? (
        <LayoutUser />
      ) : (
        <Layout />
      )}
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
