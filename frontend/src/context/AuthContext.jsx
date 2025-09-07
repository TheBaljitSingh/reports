import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dummyToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmRiOTY5NzhjMmM1ZTAzYWI5YTdiNyIsImlhdCI6MTc1NzI3MDY0NCwiZXhwIjoxNzU3Mzg1ODQ0fQ.isa1QE2Rb_hNUf7VIr_KIOnF8nzFL7rtg50uvOq_J2M")



    const fetchUser = async () => {
      console.log("fetchig the user");
    try {
      setLoading(true);
      const {data}  = await axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/auth/me`,{headers:{token:dummyToken}}); // backend route to return user info
      console.log("data",data.user);
      setUser(data.user);
    } catch(err) {
      console.log(err);
      // toast.error(err?.message)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchUser();
  }, []);


  const login = async(credentials) => {
    // TODO: Replace with API call

      await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/login`, credentials); // backend route to return user info
      await fetchUser();
   
  }

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/auth/logout`, {}, { headers:{token:dummyToken} });
    setUser(null);
  };

  const value = {user, login, logout, dummyToken};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);//make sure you are using it in usecontext
  
}