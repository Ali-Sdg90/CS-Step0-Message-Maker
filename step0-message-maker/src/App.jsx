import React from "react";
import Style from "./App.module.css";
import Header from "./components/Header";
import AddToList from "./components/AddToList";
import RemoveFromList from "./components/RemoveFromList";
import Footer from "./components/Footer";
import ShowList from "./components/ShowList";

const App = () => {
    return (
        <div>
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
