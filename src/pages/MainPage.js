import React, {useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {Button, Table} from "react-bootstrap";
import ProductComponent from "../components/ProductComponent";
import {useRecoilValue} from "recoil";
import {orderTotalState} from "../atom/OrderState";
import useCustomProduct from "../hooks/useCustomProduct";
import useCustomOrder from "../hooks/useCustomOrder";

function MainPage(props) {

    const [selectBox, setSelectBox] = useState([0]);

    const [boxId, setBoxId] = useState(1);

    const {products} = useCustomProduct();

    const {orders} = useCustomOrder()

    const totalValue = useRecoilValue(orderTotalState);

    const addSelectBox = () => {
        setSelectBox(selectBox.concat(boxId))
        setBoxId(boxId + 1)
        console.log("selectBox : " + selectBox)
        console.log("boxId : " + boxId)
    }

    return (
        <BasicLayout>
            <div className="w-full px-1">
                <form id="orderForm">
                <Table borderless={true} className="ml-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>상품</th>
                            <th>수량</th>
                            <th>금액</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectBox.map(boxId => <ProductComponent id={boxId} key={boxId} product={products}/>)}
                    <tr>
                        <td></td>
                        <td></td>
                        <td align={"right"}>합계 : </td>
                        <td>{totalValue}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
                </form>
                <div className="flex justify-between mx-3">
                    <Button variant="primary"
                            size="sm"
                            onClick={addSelectBox}>
                        +
                    </Button>
                    <Button variant="success"
                            size="sm"
                            onClick={() => {console.log(orders)}}>
                        주문
                    </Button>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MainPage;