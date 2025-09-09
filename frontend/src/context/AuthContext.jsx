import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api"

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [dummyToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmRiOTY5NzhjMmM1ZTAzYWI5YTdiNyIsImlhdCI6MTc1NzI3MDY0NCwiZXhwIjoxNzU3Mzg1ODQ0fQ.isa1QE2Rb_hNUf7VIr_KIOnF8nzFL7rtg50uvOq_J2M")



    const fetchUser = async () => {
      console.log("fetchig the user");
    try {
      setLoading(true);
      const {data} = await api.get(`/api/v1/auth/me`); // backend route to return user info
      setUser(data.user);
    } catch(err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const testApi = async ()=>{

      const {data}  = await api.get(`/test`); // backend route to return user info
      console.log(data);

  }

  useEffect(() => {
    fetchUser();
    testApi(); //just to server awake up

  }, []);



  const login = async(credentials) => {
    // TODO: Replace with API call

      // await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/login`, credentials); // backend route to return user info
    try {
        const {data} = await api.post("/api/v1/auth/login", credentials);
        localStorage.setItem("token",data.token);
        await fetchUser();
    } catch (error) {
      console.log(error);
      
    }
   
  }

  const logout = async () => {
    localStorage.removeItem("token"); //clear the token 
    await api.post("/api/v1/auth/logout");
    // await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/logout`, {}, { headers:{token:dummyToken} });
    setUser(null);
  };

  const value = {user, login, logout, loading};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);//make sure you are using it in usecontext
  
}