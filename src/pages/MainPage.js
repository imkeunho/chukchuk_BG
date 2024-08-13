import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {Outlet} from "react-router-dom";

function MainPage(props) {
    return (
        <BasicLayout>
            Main Page
            <Outlet/>
        </BasicLayout>
    );
}

export default MainPage;