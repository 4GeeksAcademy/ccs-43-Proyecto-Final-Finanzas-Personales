import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Redirect } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/Login";
import { Single } from "./pages/single";
import { Registro } from "./pages/Registro";
import { Movimientos } from "./pages/Movimientos";
import injectContext from "./store/appContext";
import { UserHome } from "./pages/userHome";
import { NavbarUserHome} from "./component/NavbarUserHome";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                {isLoggedIn ? <NavbarUserHome /> : <Navbar />}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/Login"/>
                        <Route element={<Registro />} path="/Registrarse" />
                        <Route element={<Movimientos />} path="/Nosotros" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<UserHome />} path="/UserHome" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);