import React, { useContext } from "react";
import Style from "./RemoveFromList.module.scss";
import { ListContext } from "../../context/AppContext";
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
        isAdminUsingApp,
    } = useContext(ListContext);

    const deleteHandler = (memberID, sectionNumber) => {
        console.log("DELETE", sectionsHeader[sectionNumber], memberID);

        if (isAdminUsingApp) {
            const memberDoc = doc(db, sectionsHeader[sectionNumber], memberID);
            deleteDoc(memberDoc);

            console.log("Online Mode: Remove Member");
        } else {
            console.log("Local Mode: Remove Member");
        }
    };

    return (
        <div className={Style.container}>
            <div className={Style.header}>Remove Member From the List</div>

            <div className={Style.positionSections}>
                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        {sectionsHeader[0]} (
                        {technicalMentorsList.length
                            ? technicalMentorsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {technicalMentorsList.length ? (
                            technicalMentorsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() =>
                                            deleteHandler(member.id, 0)
                                        }
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
                        {CSharpInternsList.length
                            ? CSharpInternsList.length
                            : "?"}
                        )
                    </div>

                    <div className={Style.members}>
                        {CSharpInternsList.length ? (
                            CSharpInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() =>
                                            deleteHandler(member.id, 1)
                                        }
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
                        {MLInternsList.length ? MLInternsList.length : "?"})
                    </div>

                    <div className={Style.members}>
                        {MLInternsList.length ? (
                            MLInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() =>
                                            deleteHandler(member.id, 2)
                                        }
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
                        {WebInternsList.length ? WebInternsList.length : "?"})
                    </div>

                    <div className={Style.members}>
                        {WebInternsList.length ? (
                            WebInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() =>
                                            deleteHandler(member.id, 3)
                                        }
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
