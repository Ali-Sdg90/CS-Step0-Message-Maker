import React from "react";
import Style from "./Header.module.scss";

const Header = () => {
    return (
        <div className={Style.container}>
            <h1>
                <a
                    className={Style.ICARUS}
                    href="https://also-ali-sdg90.github.io/ICARUS/"
                >
                    -
                </a>
                CS-Step0-Message-Maker
                <a
                    className={Style.ICARUS}
                    href="https://also-ali-sdg90.github.io/ICARUS/"
                >
                    -
                </a>
            </h1>
        </div>
    );
};

export default Header;
