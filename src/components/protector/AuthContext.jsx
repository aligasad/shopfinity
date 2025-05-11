import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../../firebase/FirebaseConfig.jsx";



const AuthContext = createContext();


function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (loggedinUser) => {
    setUser(loggedinUser);
  });

  return (
    <AuthContext.Provider value={{user, setUser}}>
    {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
 
export default AuthProvider;