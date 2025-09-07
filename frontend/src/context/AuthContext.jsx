import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState({name:"Baljit singh", email:"thebaljitsinghin@gmail.com", role:"Admin"})

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser({ name: "Admin", token }) // Normally you'd decode JWT
    }
  }, [])

  const login = (username, password) => {
    // TODO: Replace with API call
    if (username === "admin" && password === "admin") {
      const fakeToken = "123456"
      localStorage.setItem("token", fakeToken)
      setUser({ name: "Admin", token: fakeToken })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {user, login, logout};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);//make sure you are using it in usecontext
  
}