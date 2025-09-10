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
      {/* if i don't wrap thae app in provider then i try to access the provider mthod then i will get the error */}
      <JobStatusProvider>  
        <App />
      </JobStatusProvider>
    </AuthProvider>
  </React.StrictMode>
);
