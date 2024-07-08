import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListContext } from "../../store/AppContext";

const Tostify = () => {
    const { toastifyObj } = useContext(ListContext);

    useEffect(() => {
        notify(toastifyObj);
    }, [toastifyObj]);

    const notify = ({ title, mode }) => {
        return toast[mode](title, {
            position: "top-right",
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
