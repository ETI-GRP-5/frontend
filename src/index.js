import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "provider/AuthProvider";
import firebaseConfig from "./firebaseConfig";
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import App from "./App";

// Initialize Firebase
// woop woop 
const app = initializeApp(firebaseConfig);
getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
  </BrowserRouter>
);
