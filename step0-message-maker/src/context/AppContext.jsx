import React, { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const ListContext = createContext(null);

const AppContext = ({ children }) => {
    const [technicalMentorsList, setTechnicalMentorsList] = useState([]);
    const [CSharpInternsList, setCSharpInternsList] = useState([]);
    const [MLInternsList, setMLInternsList] = useState([]);
    const [WebInternsList, setWebInternsList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isAppReadyToUse, setIsAppReadyToUse] = useState(false);
    const [isAdminUsingApp, setIsAdminUsingApp] = useState(false);

    const sortNames = (list) => {
        list.sort((a, b) => {
            let nameA = a.id.toLowerCase();
            let nameB = b.id.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        return list;
    };

    useEffect(() => {
        const fetchData = () => {
            const unsubscribeMentors = onSnapshot(
                collection(db, "Technical Mentors"),
                (snapshot) => {
                    const technicalMentorsData = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setTechnicalMentorsList(sortNames(technicalMentorsData));
                },
                (error) => {
                    console.error("Error fetching data: ", error);
                    setErrorMsg(error.message);
                }
            );

            const unsubscribeCSharp = onSnapshot(
                collection(db, "C# Interns"),
                (snapshot) => {
                    const csharpInternsData = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setCSharpInternsList(sortNames(csharpInternsData));
                },
                (error) => {
                    console.error("Error fetching data: ", error);
                    setErrorMsg(error.message);
                }
            );

            const unsubscribeML = onSnapshot(
                collection(db, "ML Interns"),
                (snapshot) => {
                    const mlInternsData = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMLInternsList(sortNames(mlInternsData));
                },
                (error) => {
                    console.error("Error fetching data: ", error);
                    setErrorMsg(error.message);
                }
            );

            const unsubscribeWeb = onSnapshot(
                collection(db, "Web Interns"),
                (snapshot) => {
                    const webInternsData = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setWebInternsList(sortNames(webInternsData));
                },
                (error) => {
                    console.error("Error fetching data: ", error);
                    setErrorMsg(error.message);
                }
            );

            return () => {
                unsubscribeMentors();
                unsubscribeCSharp();
                unsubscribeML();
                unsubscribeWeb();
            };
        };

        const unsubscribe = fetchData();

        return () => unsubscribe;
    }, []);

    useEffect(() => {
        if (!errorMsg) {
            if (
                technicalMentorsList.length > 0 &&
                CSharpInternsList.length > 0 &&
                MLInternsList.length > 0 &&
                WebInternsList.length > 0
            ) {
                setIsAppReadyToUse(true);
            } else {
                setIsAppReadyToUse(false);
            }
        }
    }, [
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
    ]);

    useEffect(() => {
        if (isAppReadyToUse) {
            console.log("APP IS READY TO USE");
        }
    }, [isAppReadyToUse]);

    return (
        <ListContext.Provider
            value={{
                technicalMentorsList,
                setTechnicalMentorsList,
                CSharpInternsList,
                setCSharpInternsList,
                MLInternsList,
                setMLInternsList,
                WebInternsList,
                setWebInternsList,
                errorMsg,
                setIsAdminUsingApp,
                isAdminUsingApp,
                isAppReadyToUse,
            }}
        >
            {children}
        </ListContext.Provider>
    );
};

export default AppContext;
