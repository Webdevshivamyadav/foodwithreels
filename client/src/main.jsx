import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthFoodPartnerProvider } from "../src/context/FoodPartnerContext/AuthFoodPartner.jsx";
import { FetchItemProvider } from "../src/context/FoodPartnerContext/FetchItem.jsx";
import {Provider} from 'react-redux';
import store from './store/store'


createRoot(document.getElementById("root")).render(
 <Provider store={store}>
<BrowserRouter>
    <AuthFoodPartnerProvider >
      <FetchItemProvider>
          <App />
      </FetchItemProvider>
     
    </AuthFoodPartnerProvider>
  </BrowserRouter>
 </Provider>
  
);
