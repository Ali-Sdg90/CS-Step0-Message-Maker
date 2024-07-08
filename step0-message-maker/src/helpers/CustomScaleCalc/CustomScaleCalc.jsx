import React, { useEffect, useState } from "react";
import "./CustomScaleCalc.scss";

const CustomScaleCalc = ({ children }) => {
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
            const aspectRatio = pageHeight / pageWidth;

            if (pageHeight > pageWidth - 300) {
                if (pageHeight / pageWidth > 1177 / 689) {
                    setScaleValue((1 * pageWidth) / 695);
                } else if (
                    pageHeight / pageWidth < 915 / 616 &&
                    pageWidth > pageHeight
                ) {
                    setScaleValue((0.5 * pageWidth) / 695);
                } else {
                    setScaleValue((0.65 * pageWidth) / 695);
                }
            } else {
                setScaleValue((1 * pageHeight) / 695);
            }
        } else {
            setScaleValue((1 * pageHeight) / 695);
        }
    }, [pageWidth, pageHeight]);

    const containerClassName = () => {
        return `${
            pageHeight > pageWidth - 300 ? "CustomScaleCalc" : ""
        } ${"DefaultProperties"}`;
    };

    return (
        <div className={"container"}>
            <div
                className={containerClassName()}
                style={
                    pageHeight > pageWidth - 300
                        ? {
                              transform: `scale(${scaleValue}) rotate(90deg) translate(50%, -50%)`,
                              top: `${(pageHeight - 1150 * scaleValue) / 2}px`,
                          }
                        : {
                              transform: `scale(${scaleValue})`,
                              width: `${pageWidth / scaleValue}px`,
                          }
                }
            >
                {children}
            </div>
        </div>
    );
};

export default CustomScaleCalc;
