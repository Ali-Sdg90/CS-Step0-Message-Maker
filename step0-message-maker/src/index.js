import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import AppContext from "./store/AppContext";
import FirebaseConnectionChecker from "./helpers/FirebaseConnectionChecker/FirebaseConnectionChecker.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppContext>
            <FirebaseConnectionChecker>
                <App />
            </FirebaseConnectionChecker>
        </AppContext>
    </React.StrictMode>
);
