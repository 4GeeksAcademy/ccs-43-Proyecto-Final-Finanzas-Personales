import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Redirect } from "react-router-dom";

import { NavbarUserHome} from "./component/NavbarUserHome";
import injectContext from "./store/appContext";
import { UserHome } from "./pages/userHome";

import { Footer } from "./component/footer";

const LayoutUser = () => {
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <NavbarUserHome />
                    <Routes>
                        <Route element={<UserHome />} path="/" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(LayoutUser);