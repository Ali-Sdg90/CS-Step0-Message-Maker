import React from "react";
import Style from "./assets/styles/App.module.scss";
import Header from "./components/Header/Header";
import AddToList from "./components/AddToList/AddToList";
import RemoveFromList from "./components/RemoveFromList/RemoveFromList";
import Footer from "./components/Footer/Footer";
import ShowList from "./components/ShowList/ShowList";

const App = () => {
    return (
        <div className={Style.container}>
            <Header />
            <div className={Style.mainContents}>
                <div className={Style.leftSide}>
                    <AddToList />
                    <RemoveFromList />
                </div>
                <ShowList />
            </div>
            <Footer />
        </div>
    );
};

export default App;
