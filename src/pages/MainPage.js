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
            <div className="md:w-2/3 lg:w-3/4 px-5 py-3">
                <Table borderless={true}>
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
                        <td colSpan={3}>
                            합계 : {totalValue}
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Button variant="primary"
                        size="lg"
                        onClick={addSelectBox}>
                    +
                </Button>
                <button onClick={() => {console.log(orders)}}>order</button>
            </div>
        </BasicLayout>
    );
}

export default MainPage;