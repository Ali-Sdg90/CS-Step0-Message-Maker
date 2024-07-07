import React, { useEffect, useState } from "react";
import Style from "./assets/styles/App.module.scss";
import Header from "./components/Header/Header";
import AddToList from "./components/AddToList/AddToList";
import RemoveFromList from "./components/RemoveFromList/RemoveFromList";
import Footer from "./components/Footer/Footer";
import ShowList from "./components/ShowList/ShowList";
import LoginSection from "./components/Login/LoginSection";

const App = () => {
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [scaleValue, setScaleValue] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setPageWidth(window.innerWidth);
            setPageHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (pageHeight > pageWidth - 300) {
            if (pageHeight / pageWidth > 1130 / 780) {
                setScaleValue((1 * pageWidth) / 695);
            } else if (
                pageHeight / pageWidth < 915 / 616 &&
                pageWidth > pageHeight
            ) {
                setScaleValue((0.5 * pageWidth) / 695);
            } else {
                setScaleValue((0.7 * pageWidth) / 695);
            }
        } else {
            setScaleValue((1 * pageHeight) / 695);
        }
    }, [pageWidth, pageHeight]);

    return (
        <div className={Style.container}>
            <div
                className={`${
                     pageHeight > pageWidth - 300
                        ? Style.CustomScaleCalc
                        : ""
                }  ${Style.DefaultProperties}`}
                style={
                    pageHeight > pageWidth - 300
                        ? {
                              transform: `scale(${scaleValue}) rotate(90deg) translate(50%, -50%)`,
                              top: `${(pageHeight - 1000 * scaleValue) / 2}px`,
                          }
                        : {
                              transform: `scale(${scaleValue})`,
                              width: `${pageWidth / scaleValue}px`,
                          }
                }
            >
                <Header />
                <div className={Style.mainContents}>
                    <LoginSection />
                    <div className={Style.leftSide}>
                        <AddToList />
                        <RemoveFromList />
                    </div>
                    <ShowList />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;
