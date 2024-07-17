import React from 'react';
import BasicMenu from "../components/menus/BasicMenu";

function BasicLayout({children}) {
    return (
        <>
            <BasicMenu/>
                {children}
        </>
    );
}

export default BasicLayout;