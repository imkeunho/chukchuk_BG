import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import OrderSheetComponent from "../components/order/OrderSheetComponent";

function AdminPage(props) {

    return (
        <BasicLayout>
            <OrderSheetComponent></OrderSheetComponent>
        </BasicLayout>
    );
}

export default AdminPage;