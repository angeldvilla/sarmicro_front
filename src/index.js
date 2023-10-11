import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import styles from "./background.module.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// Crea un punto de inicio para renderizar la aplicación en el elemento con el ID "root".
createRoot(document.getElementById("root")).render(
   // Utilizamos el enrutador BrowserRouter para gestionar las rutas de la aplicación.
  <BrowserRouter>
  {/* Proporcionamos el store de Redux a la aplicación a través del componente Provider. */}
    <Provider store={store}>
       {/* Se Envuelve la aplicación en un div con una clase CSS "background". */}
      <div className={styles.background}>
        {/* Renderizamos el componente principal de la aplicación, que es "App". */}
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);
