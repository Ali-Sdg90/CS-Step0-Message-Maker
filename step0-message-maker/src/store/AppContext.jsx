import React, { createContext, useEffect, useMemo, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const ListContext = createContext(null);

const AppContext = ({ children }) => {
    const [technicalMentorsList, setTechnicalMentorsList] = useState([
        "initial load",
    ]);
    const [CSharpInternsList, setCSharpInternsList] = useState([
        "initial load",
    ]);
    const [MLInternsList, setMLInternsList] = useState(["initial load"]);
    const [WebInternsList, setWebInternsList] = useState(["initial load"]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isAppReadyToUse, setIsAppReadyToUse] = useState(false);
    const [isAdminUsingApp, setIsAdminUsingApp] = useState(false); // TODO: false

    const sortNames = (list) => {
        list.sort((a, b) => {
            let nameA = a.id.toLowerCase();
            let nameB = b.id.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        console.log(list);
        return list;
    };

    const sortedTechnicalMentorsList = useMemo(
        () => sortNames([...technicalMentorsList]),
        [technicalMentorsList]
    );
    const sortedCSharpInternsList = useMemo(
        () => sortNames([...CSharpInternsList]),
        [CSharpInternsList]
    );
    const sortedMLInternsList = useMemo(
        () => sortNames([...MLInternsList]),
        [MLInternsList]
    );
    const sortedWebInternsList = useMemo(
        () => sortNames([...WebInternsList]),
        [WebInternsList]
    );

    const fetchData = async () => {
        try {
            const technicalMentorsList = await getDocs(
                collection(db, "Technical Mentors")
            );

            const technicalMentorsData = technicalMentorsList.docs.map(
                (doc) => ({ ...doc.data(), id: doc.id })
            );

            setTechnicalMentorsList(technicalMentorsData);

            // -------------

            const csharpInternsList = await getDocs(
                collection(db, "C# Interns")
            );
            const csharpInternsData = csharpInternsList.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setCSharpInternsList(csharpInternsData);

            // -------------

            const mlInternsList = await getDocs(collection(db, "ML Interns"));
            const mlInternsData = mlInternsList.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setMLInternsList(mlInternsData);

            // -------------

            const webInternsList = await getDocs(collection(db, "Web Interns"));
            const webInternsData = webInternsList.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setWebInternsList(webInternsData);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setErrorMsg(error.message);
        }
    };

    useEffect(() => {
        return () => fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [isAdminUsingApp]);

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

        // console.log("technicalMentorsList", technicalMentorsList);
    }, [
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
        errorMsg,
    ]);

    useEffect(() => {
        if (isAppReadyToUse) {
            console.log("APP IS READY TO USE");
        }
    }, [isAppReadyToUse]);

    return (
        <ListContext.Provider
            value={{
                technicalMentorsList: sortedTechnicalMentorsList,
                setTechnicalMentorsList,
                CSharpInternsList: sortedCSharpInternsList,
                setCSharpInternsList,
                MLInternsList: sortedMLInternsList,
                setMLInternsList,
                WebInternsList: sortedWebInternsList,
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
