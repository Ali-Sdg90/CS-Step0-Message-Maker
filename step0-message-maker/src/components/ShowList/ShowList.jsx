import React, { useContext, useEffect, useState } from "react";
import Style from "./ShowList.module.scss";
import { demoList } from "./demoList";
import { ListContext } from "../../store/AppContext.jsx";

const numbersFA = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const ShowList = () => {
    const [textareaValue, setTextareaValue] = useState("");
    const [copyBtnText, setCopyBtnText] = useState("Copy");

    const addMembersToList = (courseList) => {
        return courseList
            .map((member, index) => {
                // console.log(
                //     `${(index + 1)
                //         .toString()
                //         .split("")
                //         .map((char) => numbersFA[char])
                //         .toString()
                //         .replace(/,/g, "")}. ${member["Name in Persian"]} ${
                //         member["Telegram ID"]
                //     }`
                // );

                return `  ${(index + 1)
                    .toString()
                    .split("")
                    .map((char) => numbersFA[char])
                    .toString()
                    .replace(/,/g, "")}. ${member["Name in Persian"]} ${
                    member["Telegram ID"]
                }`;
            })
            .toString()
            .replace(/,/g, "\n");
    };

    const {
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
        setToastifyObj,
    } = useContext(ListContext);

    useEffect(() => {
        setTextareaValue(`سلام وقت بخیر
        
اینترن‌های تازه‌ وارد به برنامه لازم است طبق داکیومنت استپ صفر تسکی با عنوان «برگزاری جلسه مصاحبه با اعضای برنامه» را انجام دهند. هدف این تسک آشنایی اینترن‌های جدید با محیط و افراد حاضر در برنامه هستش.

طبق این تسک، اینترن‌های استپ صفر لازم است با سه گروه از اعضای دوره آشنا شوند:
  ۱. تمام منتورهای فنی برنامه
  ۲. تمام اینترن‌های هم‌دوره‌ای
  ۳. کوردینیتور خود اینترن

لیست تمام منتورهای فنی برنامه و اینترن‌های دوره‌های مختلف در این پیام آورده شده تا اینترن‌های استپ صفر بتونن به راحتی به لیست افرادی که لازم است با آنها مصاحبه داشته باشند، دسترسی پیدا کنند.

🔷 لیست منتورهای فنی‌ برنامه:
${addMembersToList(technicalMentorsList)}

🔶 لیست اینترن‌های دوره سی‌شارپ:
${addMembersToList(CSharpInternsList)}

🔶 لیست اینترن‌های دوره یادگیری ماشین:
${addMembersToList(MLInternsList)}

🔶 لیست اینترن‌های دوره وب:
${addMembersToList(WebInternsList)}

این لیست با تغییر افراد برنامه آپدیت خواهد شد.

موفق باشین🌱`);
    }, [
        technicalMentorsList,
        CSharpInternsList,
        MLInternsList,
        WebInternsList,
    ]);

    const copyBtnHandler = () => {
        console.log("COPY");

        navigator.clipboard.writeText(textareaValue).then(() => {
            console.log(`Copied to clipboard`);
            setCopyBtnText("Copied");

            setToastifyObj({
                title: "Copied Output to Clipboard",
                mode: "info",
            });

            setTimeout(() => {
                setCopyBtnText("Copy");
            }, 1500);
        });
    };

    return (
        <div className={Style.container} dir="ltr">
            <div className={Style.header}>Output</div>
            <textarea
                dir="rtl"
                value={textareaValue}
                cols="30"
                rows="10"
                disabled
            ></textarea>

            <div className={Style.copyBtnContainer}>
                <button className={Style.copyBtn} onClick={copyBtnHandler}>
                    {copyBtnText}
                </button>
            </div>
        </div>
    );
};

export default ShowList;
