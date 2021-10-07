import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import history from "./history";
import { auth, firestore } from "../index";

export const AuthContext = React.createContext({ status: "pending" })

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ status: "pending" });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setAuthState({status: "fetched"})
                // onSnapshot(doc(firestore, "users", user.uid), (doc) => {
                //     setAuthState({status: "fetched", user: doc.data()})
                // });
            } else {
                setAuthState({status: "empty"})
            }
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