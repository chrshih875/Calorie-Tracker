import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });
    const navigate =  useNavigate();
    const login = async (payload) => {
        let apiResponse = await axios.post("http://localhost:8080/login", payload, {
            withCredentials: true,
        });
        // localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
        setUser(apiResponse.data);
        navigate("/home");
    };
    return (
        <>
            <AuthContext.Provider value={{ user, login }}>
                {children}
            </AuthContext.Provider>
        </>
        );
    };
export default AuthContext;
