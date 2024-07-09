import React, { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListContext } from "../../store/AppContext";

const Tostify = () => {
    const { toastifyObj } = useContext(ListContext);

    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [pageHeight, setPageHeight] = useState(window.innerHeight);

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
        notify(toastifyObj);
    }, [toastifyObj]);

    const notify = ({ title, mode }) => {
        return toast[mode](title, {
            position: pageHeight > pageWidth - 300 ? "top-left" : "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Tostify;
