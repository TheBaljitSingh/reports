import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "./components/MainLayout"
import Upload from "./components/Upload"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./components/Landing"
import Login from  "./components/Login"
import Modal from "./components/Modal"
import { ToastContainer } from "react-toastify";


function UploadModalRoute() {
  const navigate = useNavigate()
  return (
    <Modal isOpen onClose={() => navigate(-1)} title="Upload Reports" maxWidth="max-w-4xl">
      <Upload/>
    </Modal>
  )
}

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/upload" element={<UploadModalRoute/>} />
        </Route>

        <Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}
export default App;