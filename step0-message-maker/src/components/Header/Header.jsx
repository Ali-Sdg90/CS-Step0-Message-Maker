import React, { useContext, useState } from "react";
import Style from "./Header.module.scss";
import { ListContext } from "../../store/AppContext";
import CryptoJS from "crypto-js";

const date = "1403-04-19";

const Header = () => {
    const [EEClicked, setEEClicked] = useState([false, false]);
    const { setToastifyObj } = useContext(ListContext);

    const decrypt = (text) => {
        const bytes = CryptoJS.AES.decrypt(text, date);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        return plainText;
    };

    const clickOnEE = (dashNO) => {
        if (!EEClicked[dashNO]) {
            setToastifyObj({
                title: decrypt(
                    "U2FsdGVkX18QqAMzMvlU/aeMrucdtjI21A6HKpDOkBGirF0HmxlPAyL2Aqf3H1Q40lhGPAa3WrPKt9W+7cxTh3zTNbI0i73t6asLfnK8v515ALGI3t2DBX23Yvm3x0UC/2jGV5g+7nOqh30VnOPUADbnaBhJCC+x0WqFbP7F/2s="
                ),
                mode: "info",
            });

            window.open(
                decrypt(
                    "U2FsdGVkX18+Oy1rQJJnOndkAB/1o8SBRhMt5NBlIXv20iVTfc/FeDTfPFC1TJhp53XOM5/xczuw1jT6tHsOAQ=="
                ),
                "_blank"
            );

            setEEClicked((prevState) => {
                const newState = [...prevState];
                newState[dashNO] = true;
                return newState;
            });
        }
    };

    return (
        <div className={Style.container}>
            <h1>
                <div
                    className={!EEClicked[0] && Style.ICARUS}
                    onClick={() => clickOnEE(0)}
                >
                    -
                </div>
                <div className={Style.Title}>CS-Step0-Message-Maker</div>
                <div
                    className={!EEClicked[1] && Style.ICARUS}
                    onClick={() => clickOnEE(1)}
                >
                    -
                </div>
            </h1>
        </div>
    );
};

export default Header;
