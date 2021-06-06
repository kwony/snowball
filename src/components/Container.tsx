import React, { useEffect, useState } from "react";
import "../style/base.scss";
import "./Container.scss";
import MainPage from "./MainPage";

const Container = (props: any) => {
    useEffect(() => {

    })
    return (
        <div id="container">
            <div id="container_in">
                <div id="sidebar" />
                <MainPage />
                <div id="sidebar" />
            </div>
        </div>
    );
};

export default Container;