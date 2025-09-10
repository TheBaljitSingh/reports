import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider} from "./context/AuthContext"
import {JobStatusProvider} from "./context/JobStatusContext"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <JobStatusProvider>
        <App />
      </JobStatusProvider>
    </AuthProvider>
  </React.StrictMode>
);
