import React, { useEffect, useState } from "react";
import Style from "./AddToList.module.scss";

const AddToList = () => {
    const [formData, setFormData] = useState({
        nameEN: "",
        nameFA: "",
        telegramID: "",
        course: "",
    });
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        console.log("=>", formData.course);
        if (
            formData.nameEN &&
            formData.nameFA &&
            formData.telegramID &&
            formData.course &&
            formData.course !== "Select"
        ) {
            setFormFilled(true);
            console.log("TRUE");
        } else {
            setFormFilled(false);
            console.log("False");
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFilled) {
            console.log("Form data submitted: ", formData);
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
                            value={formData.nameEN}
                            onChange={handleChange}
                            required
                            autocomplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="nameFA">Full Name (FA):</label>
                        <input
                            type="text"
                            id="nameFA"
                            name="nameFA"
                            value={formData.nameFA}
                            onChange={handleChange}
                            required
                            autocomplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="telegramID">Telegram ID:</label>
                        <input
                            type="text"
                            id="telegramID"
                            name="telegramID"
                            value={formData.telegramID}
                            onChange={handleChange}
                            required
                            autocomplete="off"
                        />
                    </div>
                    <div className={Style.input}>
                        <label htmlFor="course">Position:</label>
                        <select
                            className={Style.selectOption}
                            name="course"
                            required
                            onChange={handleChange}
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
                    }`}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddToList;
