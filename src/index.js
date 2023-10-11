import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import styles from "./background.module.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <div className={styles.background}>
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);
