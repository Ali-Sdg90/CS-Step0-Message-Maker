import React, { useContext, useEffect, useState } from "react";
import Style from "./LoginSection.module.scss";
import CryptoJS from "crypto-js";
import { ListContext } from "../../store/AppContext";

const LoginSection = () => {
    const { setIsAdminUsingApp, isAdminUsingApp } = useContext(ListContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [isBtnShacking, setIsBtnShacking] = useState(false);

    const { setToastifyObj } = useContext(ListContext);

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
            console.log("Aloha Admin :)");
            setIsAdminUsingApp(true);

            setFormData({
                username: "",
                password: "",
            });

            setToastifyObj({
                title: "Aloha Admin :)",
                mode: "info",
            });

            setTimeout(() => {
                setToastifyObj({
                    title: "You are connected to database",
                    mode: "success",
                });
            }, 300);
        } else {
            console.log("You are NOT the Admin :)");
            setIsAdminUsingApp(false);

            setToastifyObj({
                title: "You are NOT the Admin :)",
                mode: "error",
            });
        }
    };

    useEffect(() => {
        if (isBtnShacking) {
            const timer = setTimeout(() => {
                setIsBtnShacking(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isBtnShacking]);

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
                        } ${isBtnShacking ? Style.shakeBtn : ""}`}
                        onClick={() => {
                            if (!isAdminUsingApp) {
                                setIsBtnShacking(true);
                            }
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className={Style.loginExplanationContainer}>
                <div className={Style.loginExplanationText}>
                    To modify the database, you must log in with an Admin
                    account. Without an Admin login, you can still use the app
                    and make changes, but these changes will only be local and
                    will not be uploaded to the database.
                </div>
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
