// import React, { useState, useEffect, useContext } from "react";
// import ReactDOM from "react-dom";
// import "../styles/index.css";

// import Layout from "./layout";
// import LayoutUser from "./layoutUser";

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   // const {store} = useContext(Context)
//   // console.log(store)
//   useEffect(() =>{
//     if( token == null  && localStorage.getItem("token") != null){
//       setToken(localStorage.getItem("token")) 
//     }
//   },[token])  
  
//   return (
//     <React.StrictMode>
//       {token ? (
//         <LayoutUser />
//       ) : (
//         <Layout setToken = { setToken } />
//       )}
//     </React.StrictMode>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("app"));
//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));