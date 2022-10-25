import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StateContext } from "../context/StateContext";
import Layout from "./components/Layout";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContext>
      <Router>
        <Header />
        <Layout>
          <App />
        </Layout>
      </Router>
    </StateContext>
  </React.StrictMode>
);
