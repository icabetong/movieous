import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index";

export const AuthContext = React.createContext({ status: "pending" })

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ status: "pending" });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({ status: user ? "fetched" : "empty" })
        })
        return unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    )
}

export const useAuthState = () => {
    return useContext(AuthContext);
}