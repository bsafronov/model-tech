import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "./lib/store.ts";
import "primereact/resources/themes/lara-light-cyan/theme.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./lib/worker.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </Provider>
    </React.StrictMode>
  );
});
