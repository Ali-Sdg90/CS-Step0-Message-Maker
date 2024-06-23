import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
    const [technicalMentors, setTechnicalMentors] = useState([]);

    const technicalMentorsRef = collection(db, "Technical Mentors");

    const getTechnicalMentorsInfo = async () => {
        try {
            const data = await getDocs(technicalMentorsRef);
            const technicalMentorList = data.docs.map((technicalMentor) => ({
                ...technicalMentor.data(),
                id: technicalMentor.id,
            }));
            setTechnicalMentors(technicalMentorList);

            // console.log(data);
        } catch (err) {
            console.log("ERROR", err);
        }
    };

    useEffect(() => {
        getTechnicalMentorsInfo();
    }, []);

    useEffect(() => {
        console.log(technicalMentors);
    }, [technicalMentors]);

    return (
        <div>
            <h1>Aloha</h1>
            {technicalMentors.map((technicalMentor) => (
                <div>{technicalMentor.id}</div>
            ))}
        </div>
    );
};

export default App;
