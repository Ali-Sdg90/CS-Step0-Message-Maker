import React, { useContext, useEffect, useState } from "react";
import Style from "./AddToList.module.scss";
import { db } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ListContext } from "../../store/AppContext";

const AddToList = () => {
    const {
        setTechnicalMentorsList,
        setCSharpInternsList,
        setMLInternsList,
        setWebInternsList,
        isAdminUsingApp,
        setToastifyObj,
    } = useContext(ListContext);

    const [formData, setFormData] = useState({
        nameEN: "",
        nameFA: "",
        telegramID: "",
        course: "Select",
    });

    const [formFilled, setFormFilled] = useState(false);

    const [isBtnShacking, setIsBtnShacking] = useState(false);

    useEffect(() => {
        if (
            formData.nameEN &&
            formData.nameFA &&
            formData.telegramID &&
            formData.telegramID !== "@" &&
            formData.course !== "Select"
        ) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [formData]);

    useEffect(() => {
        if (isBtnShacking) {
            const timer = setTimeout(() => {
                setIsBtnShacking(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isBtnShacking]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formFilled) {
            let collectionRef = "";

            switch (formData.course) {
                case "Technical Mentor":
                    collectionRef = collection(db, "Technical Mentors");
                    break;
                case "C# Intern":
                    collectionRef = collection(db, "C# Interns");
                    break;
                case "ML Intern":
                    collectionRef = collection(db, "ML Interns");
                    break;
                case "Web Intern":
                    collectionRef = collection(db, "Web Interns");
                    break;
                default:
                    return;
            }

            if (isAdminUsingApp) {
                const newDocRef = doc(collectionRef, formData.nameEN);

                await setDoc(newDocRef, {
                    Course: formData.course,
                    "Name in Persian": formData.nameFA,
                    "Telegram ID": formData.telegramID,
                });

                console.log("Online Mode: Add Member");

                setToastifyObj({
                    title: `Online Mode: Add "${formData.nameEN}"`,
                    mode: "warning",
                });
            } else {
                console.log("Local Mode: Add Member");

                setToastifyObj({
                    title: `Local Mode: Add "${formData.nameEN}"`,
                    mode: "info",
                });
            }

            setFormData({
                nameEN: "",
                nameFA: "",
                telegramID: "",
                course: "Select",
            });

            const addNewMemberToListFunc = (prevState) => {
                return [
                    ...prevState,
                    {
                        Course: formData.course,
                        "Name in Persian": formData.nameFA,
                        "Telegram ID": formData.telegramID,
                        id: formData.nameEN,
                    },
                ];
            };

            switch (formData.course) {
                case "Technical Mentor":
                    setTechnicalMentorsList((prevState) =>
                        addNewMemberToListFunc(prevState)
                    );
                    break;
                case "C# Intern":
                    setCSharpInternsList((prevState) =>
                        addNewMemberToListFunc(prevState)
                    );
                    break;
                case "ML Intern":
                    setMLInternsList((prevState) =>
                        addNewMemberToListFunc(prevState)
                    );
                    break;
                case "Web Intern":
                    setWebInternsList((prevState) =>
                        addNewMemberToListFunc(prevState)
                    );
                    break;
                default:
                    break;
            }
        }
    };

    const telegramIDHandler = (e) => {
        if (e.target.value.indexOf("@") === 0) {
            if (e.target.value[1] === "@") {
                setFormData((prevState) => ({
                    ...prevState,
                    telegramID: e.target.value.substring(1),
                }));
            } else {
                handleChange(e);
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                telegramID: `@${e.target.value}`,
            }));
        }
    };

    return (
        <div className={Style.container}>
            <div className={Style.header}>Add New Member to the List</div>
            <form onSubmit={handleSubmit}>
                <div className={Style.inputs}>
                    <div className={Style.input}>
                        <label htmlFor="nameEN">Full Name (EN):</label>
                        <input
                            type="text"
                            id="nameEN"
                            name="nameEN"
                            placeholder="Full Name in English"
                            value={formData.nameEN}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="nameFA">Full Name (FA):</label>
                        <input
                            type="text"
                            id="nameFA"
                            name="nameFA"
                            placeholder="Full Name in Farsi"
                            value={formData.nameFA}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="telegramID">Telegram ID:</label>
                        <input
                            type="text"
                            id="telegramID"
                            name="telegramID"
                            placeholder="@Telegram_ID"
                            value={formData.telegramID}
                            onChange={telegramIDHandler}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="course">Position:</label>
                        <select
                            className={Style.selectOption}
                            name="course"
                            value={formData.course}
                            required
                            onChange={handleChange}
                            title="Please select position."
                        >
                            <option value="Select">- Select -</option>
                            <option value="Technical Mentor">
                                Technical Mentor
                            </option>
                            <option value="C# Intern">C# Intern</option>
                            <option value="ML Intern">ML Intern</option>
                            <option value="Web Intern">Web Intern</option>
                        </select>
                    </div>
                </div>

                <button
                    className={`${Style.submit} ${
                        formFilled ? Style.active : Style.disable
                    } ${isBtnShacking ? Style.shakeBtn : ""}`}
                    onClick={() => {
                        if (!formFilled) {
                            setIsBtnShacking(true);
                        }
                    }}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddToList;
