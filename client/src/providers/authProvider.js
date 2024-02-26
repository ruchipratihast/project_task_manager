import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { url } from "../config";

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
        console.log("register");
        console.log(name, email);
        setLoading(true);
        try {
            var { data } = await axios.post(`${url}/register`, {
                name,
                email,
                password
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            console.log(data);
            setLogged(true);
            setToken(data.token);
            setLoading(false);
            console.log(data.token);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log(user);
            // console.log(data.user);
        } catch (error) {
            return "err";
        }
    }

    async function login(email, password) {
        setLoading(true);

        try {
            var { data } = await axios.post(`${url}/login`, {
                "email": email,
                "password": password,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setLogged(true);
            setToken(data.token);
            setLoading(false);
            // console.log(data.token);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log(user);
            // console.log(data.user);
        } catch (error) {
            console.log(error)
            return "err";
        }
    }

    async function update(userId, newName, oldPassword, newPassword) {
        setLoading(true);

        try {
            var { data } = await axios.put(`${url}/update/${userId}`, {
                "newName": newName, 
                "oldPassword": oldPassword, 
                "newPassword": newPassword,

                headers: {
                    // Authorization: `Bearer ${token}`
                    Authorization: token
                }
            });
            console.log(data);
            return data;
         
        } catch (error) {
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
            // setUser(JSON.parse(localStorage.getItem("user")));
            setUser(localStorage.getItem("user"));
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
            update,
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