import React from "react";
import Style from "./assets/styles/App.module.scss";
import Header from "./components/Header/Header";
import AddToList from "./components/AddToList/AddToList";
import RemoveFromList from "./components/RemoveFromList/RemoveFromList";
import Footer from "./components/Footer/Footer";
import ShowList from "./components/ShowList/ShowList";
import LoginSection from "./components/Login/LoginSection";
import CustomScaleCalc from "./helpers/CustomScaleCalc/CustomScaleCalc";
import Tostify from "./helpers/Tostify/Tostify";

const App = () => {
    return (
        <div className={Style.container}>
            <CustomScaleCalc>
                <Tostify />
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
            </CustomScaleCalc>
        </div>
    );
};

export default App;
