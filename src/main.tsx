import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css"
import Provider from "./provider.tsx";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
