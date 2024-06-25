import React, { useContext } from "react";
import Style from "./RemoveFromList.module.scss";
import { ListContext } from "../../context/AppContext";

const RemoveFromList = () => {
    const {
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
    } = useContext(ListContext);

    const deleteHandler = (member) => {
        console.log("DELETE", member.id);
    };

    return (
        <div className={Style.container}>
            <div className={Style.header}>Remove Member From the List</div>

            <div className={Style.positionSections}>
                <div className={Style.positionSection}>
                    <div className={Style.sectionHeader}>
                        Technical Mentors (
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
                                        onClick={() => deleteHandler(member)}
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
                        C# Interns (
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
                                        onClick={() => deleteHandler(member)}
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
                        ML Interns (
                        {MLInternsList.length ? MLInternsList.length : "?"})
                    </div>

                    <div className={Style.members}>
                        {MLInternsList.length ? (
                            MLInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member)}
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
                        Web Interns (
                        {WebInternsList.length ? WebInternsList.length : "?"})
                    </div>

                    <div className={Style.members}>
                        {WebInternsList.length ? (
                            WebInternsList.map((member, index) => (
                                <div className={Style.memberRow} key={index}>
                                    <span
                                        className={Style.removeBtn}
                                        onClick={() => deleteHandler(member)}
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
