import React, { useContext } from "react";
import Style from "./RemoveFromList.module.scss";
import { ListContext } from "../../store/AppContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const sectionsHeader = [
    "Technical Mentors",
    "C# Interns",
    "ML Interns",
    "Web Interns",
];

const RemoveFromList = () => {
    const {
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
        setTechnicalMentorsList,
        setCSharpInternsList,
        setMLInternsList,
        setWebInternsList,
        isAdminUsingApp,
        setToastifyObj,
    } = useContext(ListContext);

    const deleteHandler = ({ id, Course }, sectionNumber) => {
        if (isAdminUsingApp) {
            const memberDoc = doc(db, sectionsHeader[sectionNumber], id);
            deleteDoc(memberDoc);

            console.log(`Online Mode: Remove Member "${id}"`);

            setToastifyObj({
                title: `Online Mode: Remove "${id}"`,
                mode: "warning",
            });
        } else {
            console.log(`Local Mode: Remove Member "${id}"`);

            setToastifyObj({
                title: `Local Mode: Remove "${id}"`,
                mode: "info",
            });
        }

        console.log(Course);

        switch (Course) {
            case "Technical Mentor":
                setTechnicalMentorsList((prevState) =>
                    prevState.filter((member) => member.id !== id)
                );
                break;
            case "C# Intern":
                setCSharpInternsList((prevState) =>
                    prevState.filter((member) => member.id !== id)
                );
                break;
            case "ML Intern":
                setMLInternsList((prevState) =>
                    prevState.filter((member) => member.id !== id)
                );
                break;
            case "Web Intern":
                setWebInternsList((prevState) =>
                    prevState.filter((member) => member.id !== id)
                );
                break;

            default:
                return;
        }
    };

    return (
        <div className={Style.container}>
            <div className={Style.header}>Remove Member From the List</div>

            <div className={Style.positionSections}>
                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        {sectionsHeader[0]} (
                        {technicalMentorsList[0] !== "initial load"
                            ? technicalMentorsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {technicalMentorsList[0] !== "initial load" ? (
                            technicalMentorsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member, 0)}
                                    >
                                        -
                                    </span>
                                    <span className={Style.memberName}>
                                        {member["Name in Persian"]}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={Style.loading}>Loading...</div>
                        )}
                    </div>
                </div>

                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        {sectionsHeader[1]} (
                        {CSharpInternsList[0] !== "initial load"
                            ? CSharpInternsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {CSharpInternsList[0] !== "initial load" ? (
                            CSharpInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member, 1)}
                                    >
                                        -
                                    </span>
                                    <span className={Style.memberName}>
                                        {member["Name in Persian"]}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={Style.loading}>Loading...</div>
                        )}
                    </div>
                </div>

                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        {sectionsHeader[2]} (
                        {MLInternsList[0] !== "initial load"
                            ? MLInternsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {MLInternsList[0] !== "initial load" ? (
                            MLInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member, 2)}
                                    >
                                        -
                                    </span>
                                    <span className={Style.memberName}>
                                        {member["Name in Persian"]}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={Style.loading}>Loading...</div>
                        )}
                    </div>
                </div>

                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        {sectionsHeader[3]} (
                        {WebInternsList[0] !== "initial load"
                            ? WebInternsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {WebInternsList[0] !== "initial load" ? (
                            WebInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member, 3)}
                                    >
                                        -
                                    </span>
                                    <span className={Style.memberName}>
                                        {member["Name in Persian"]}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={Style.loading}>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveFromList;
