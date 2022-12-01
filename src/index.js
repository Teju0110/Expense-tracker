import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { expenseTrackerReducer } from "./TrackerReducer";
import { composeWithDevTools } from "@redux-devtools/extension";


const store=createStore(expenseTrackerReducer,composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
