import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        let userProfle = localStorage.getItem("userProfile");
        if (userProfle) {
            return JSON.parse(userProfle);
        }
        return null;
        });
    const BASEURL = `http://localhost:8080`
    const navigate =  useNavigate();
    const login = async (payload) => {
        let apiResponse = await axios.post("http://localhost:8080/login", payload, {
            withCredentials: true,
        });
        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data.userDetail));
        setUser(apiResponse.data.userDetail);
        navigate("/home");
    };

    const logout = async () => {
        let payload = localStorage.getItem("userProfile");
        await axios.post("http://localhost:8080/logout", payload, {
            withCredentials: true,
        });
        localStorage.clear();
        navigate("/home");
    }

    const register = async (payload) => {
        let apiResponse = await axios.post("http://localhost:8080/register", payload, {
            withCredentials: true,
        });
        setUser(apiResponse.data);
        navigate("/home");
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, register, BASEURL, logout }}>
                {children}
            </AuthContext.Provider>
        </>
        );
    };
export default AuthContext;
