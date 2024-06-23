import React from "react";
import Style from "./ShowList.module.scss";
import { demoList } from "./demoList";

const ShowList = () => {
    return (
        <div className={Style.container} dir="ltr">
            <div className={Style.header}>Output</div>
            <textarea
                dir="rtl"
                value={demoList}
                cols="30"
                rows="10"
                disabled
            ></textarea>

            <div className={Style.copyBtnContainer}>
                <button className={Style.copyBtn}>Copy</button>
            </div>
        </div>
    );
};

export default ShowList;
