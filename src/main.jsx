import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StateContext } from "../context/StateContext";
import Layout from "./components/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContext>
      <Layout>
        <App />
      </Layout>
    </StateContext>
  </React.StrictMode>
);
