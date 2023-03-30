import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        let userProfle = localStorage.getItem("userProfile");
        if (userProfle) {
            return JSON.parse(userProfle);
        }
        return null;
        });
    const navigate =  useNavigate();
    const login = async (payload) => {
        let apiResponse = await axios.post("http://localhost:8080/login", payload, {
            withCredentials: true,
        });
        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
        // console.log(apiResponse.data, "hello");
        setUser(apiResponse.data);
        navigate("/home");
    };

    const register = async (payload) => {
        let apiResponse = await axios.post("http://localhost:8080/register", payload, {
            withCredentials: true,
        });
        setUser(apiResponse.data);
        navigate("/home");
    }

    return (
        <>
            <AuthContext.Provider value={{ user, login, register }}>
                {children}
            </AuthContext.Provider>
        </>
        );
    };
export default AuthContext;
