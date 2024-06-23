import React, { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const ListContext = createContext(null);

const AppContext = ({ children }) => {
    const [technicalMentorsList, setTechnicalMentorsList] = useState([]);
    const [CSharpInternsList, setCSharpInternsList] = useState([]);
    const [MLInternsList, setMLInternsList] = useState([]);
    const [WebInternsList, setWebInternsList] = useState([]);

    const sortNames = (list) => {
        console.log(list);
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
        const fetchData = async () => {
            try {
                const technicalMentorsList = await getDocs(
                    collection(db, "Technical Mentors")
                );
                const technicalMentorsData = technicalMentorsList.docs.map(
                    (doc) => ({ ...doc.data(), id: doc.id })
                );

                const sortedTechnicalMentorsList =
                    sortNames(technicalMentorsData);
                setTechnicalMentorsList(sortedTechnicalMentorsList);

                // -------------

                const csharpInternsList = await getDocs(
                    collection(db, "CSharp Interns")
                );
                const csharpInternsData = csharpInternsList.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                const sortedCsharpInternsList = sortNames(csharpInternsData);
                setCSharpInternsList(sortedCsharpInternsList);

                // -------------

                const mlInternsList = await getDocs(
                    collection(db, "ML Interns")
                );
                const mlInternsData = mlInternsList.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                const sortedMlInternsList = sortNames(mlInternsData);
                setMLInternsList(sortedMlInternsList);

                // -------------

                const webInternsList = await getDocs(
                    collection(db, "Web Interns")
                );
                const webInternsData = webInternsList.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                const sortedWebInternsList = sortNames(webInternsData);
                setWebInternsList(sortedWebInternsList);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

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
            }}
        >
            {children}
        </ListContext.Provider>
    );
};

export default AppContext;
