import React, { useContext, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ListContext } from "../../store/AppContext";

const FirebaseConnectionChecker = ({ children }) => {
    const { setToastifyObj } = useContext(ListContext);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const docRef = doc(db, "Test", "Test");
                await getDoc(docRef);

                console.log("Connected to Firebase");

                setToastifyObj({
                    title: "Connected to Firebase",
                    mode: "success",
                });
            } catch (err) {
                console.log("ERROR >> ", err.message);

                if (
                    err.message ===
                    "Failed to get document because the client is offline."
                ) {
                    setToastifyObj({
                        title: "Can't connect to Firebase servers. Try turning on your VPN.",
                        mode: "error",
                    });
                } else {
                    setToastifyObj({
                        title: err.message,
                        mode: "error",
                    });
                }
            }
        };

        checkConnection();
    }, [setToastifyObj]);

    return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default FirebaseConnectionChecker;
