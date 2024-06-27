import React, { useContext, useEffect, useState } from "react";
import Style from "./LoginSection.module.scss";
import CryptoJS from "crypto-js";
import { ListContext } from "../../context/AppContext";

const LoginSection = () => {
    const { setIsAdminUsingApp, isAdminUsingApp } = useContext(ListContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const decrypt = (text) => {
        const bytes = CryptoJS.AES.decrypt(text, formData.password);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        return plainText;
    };

    const encrypt = () => {
        const cipherText = CryptoJS.AES.encrypt(
            formData.username,
            formData.password
        ).toString();

        return cipherText;
    };

    const submitAdminHandler = (e) => {
        e.preventDefault();

        if (
            decrypt("U2FsdGVkX1+sCM7CdsZQ7oTO7qCANVrmNlwghoZZDxY=") ===
            decrypt(encrypt())
        ) {
            console.log("Aloha Admin");
            setIsAdminUsingApp(true);

            setFormData({
                username: "",
                password: "",
            });
        } else {
            console.log("You are not the Admin :)");
            setIsAdminUsingApp(false);
        }
    };

    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <span title="Ali Sadeghi">Administrator</span> Login
            </div>

            <div className={Style.submitForm}>
                <form onSubmit={submitAdminHandler}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        required
                        autoComplete="off"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={inputChangeHandler}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        autoComplete="off"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={inputChangeHandler}
                    />

                    <button
                        className={`${Style.submitBtn} ${
                            formData.username && formData.password
                                ? Style.active
                                : Style.disable
                        }`}
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className={Style.loginExplanation}>
                To modify the database, you must log in with an Admin account.
                Without an Admin login, you can still use the app and make
                changes, but these changes will only be local and will not be
                uploaded to the database.
            </div>

            <div
                className={`${Style.connectionState} ${
                    isAdminUsingApp && Style.adminEnters
                }`}
            >
                {isAdminUsingApp
                    ? "You are connected to the database"
                    : "You are not connected to the database"}
            </div>
        </div>
    );
};

export default LoginSection;
