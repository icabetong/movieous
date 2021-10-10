import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../index";

export const AuthContext = React.createContext({ status: "pending" })

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ status: "pending" });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                onSnapshot(doc(firestore, "users", user.uid), (snapshot) => {
                    setAuthState({ status: "fetched", user: snapshot.data() })
                })
            } else setAuthState({ status: "empty" })
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    )
}

export const useUserData = () => {
    const authContext = useContext(AuthContext);
    return authContext.user ? authContext.user : { }
}

export const useAuthState = () => {
    return useContext(AuthContext);
}