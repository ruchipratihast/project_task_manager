import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { url } from "../config";
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // State to hold the authentication token
    const [token, setToken_] = useState();
    const [logged, setLogged] = useState(false);

    // Function to set the authentication token
    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken == null) {
            localStorage.removeItem("token_task_manager_app");
        } else {
            localStorage.setItem("token_task_manager_app", newToken);
        }
    };

    async function register(name, email, password) {
        setLoading(true);
        try {
            var { data } = await axios.post(`${url}/register`, {
                "name": name,
                "email": email,
                "password": password
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setLogged(true);
            console.log(data);
            setToken(data.token);
            setLoading(false);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("User registered successfully !");
        } catch (error) {
            if (error.response.status === 409) {
                return toast.error("User Already Exist !");
            }
            return error;
        }
    }

    async function login(email, password) {
        setLoading(true);
        console.log(email, password)

        try {
            var { data } = await axios.post(`${url}/login`, {
                "email": email,
                "password": password,
            });
            console.log(data)
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setLogged(true);
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setLoading(false);
            setUser(data.user);
            return toast.success("User login successfully !");
        } catch (error) {
            console.log(error)
            return toast.error("Invelid credentials!");
        }
    }

    async function updateSetting(userId, newName, oldPassword, newPassword) {
        setLoading(true);

        try {
            var { data } = await axios.put(`${url}/update/${userId}`, {
                "newName": newName,
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            return toast.success("Updated successfully !");

        } catch (error) {
            if (error.response.status === 400) {
                return toast.error("Incorrect old password !");
            }
            if (error.response.status === 400) {
                return toast.error("Incorrect old password !");
            }
            console.log(error)
            return error;
        }
    }

    // Call the logout endpoint and then remove the user
    // from the state.
    function logout() {
        setLogged(false);
        setLoading(false);
        setToken(null);
    }

    useEffect(() => {

        let tkn = localStorage.getItem("token_task_manager_app");
        console.log(tkn);
        console.log(typeof tkn);

        if (tkn !== null && tkn !== "null") {
            setLogged(true);
            setLoading(false);
            setToken(tkn);

            // set user too
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setLogged(false);
            setLoading(false);
            setToken(null);
        }


    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            loading,
            logged,
            token,
            user,
            register,
            login,
            updateSetting,
            setToken,
            logout,
        }),
        [token, logged] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;