import React from "react";
import Style from "./LoginSection.module.scss";

const LoginSection = () => {
    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <span title="Ali Sadeghi">Administrator</span> Login
            </div>
        </div>
    );
};

export default LoginSection;
