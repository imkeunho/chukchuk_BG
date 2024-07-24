import React, {useEffect, useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {Button, InputGroup, Table} from "react-bootstrap";
import useCustomProduct from "../hooks/useCustomProduct";
import Form from "react-bootstrap/Form";
import {NumericFormat} from "react-number-format";
import {useMutation} from "@tanstack/react-query";
import FetchingModal from "../components/common/FetchingModal";
import {putList} from "../api/orderApi";
import ResultModal from "../components/common/ResultModal";
import {useNavigate} from "react-router-dom";

const orderInit = [{
    pno: 0,
    name: '',
    description: '',
    price: 0,
    qty: 0,
    selected: false
}]

const orderInfoInit = {
    dong: '',
    ho: '',
    account: '',
    cashReceipt: ''
}

function OrderPage() {

    const [orders, setOrders] = useState(orderInit);

    const [orderInfo, setOrderInfo] = useState(orderInfoInit);

    const [total, setTotal] = useState(0);

    const {products} = useCustomProduct();

    const navigate = useNavigate();

    const addMutation = useMutation({
        mutationFn: (orderSheet) => putList(orderSheet)
    })

    const orderBtnHandler = () => {
        // qty === 0 제외
        const filteringOrderList = orders.filter((item) => item.qty !== 0)

        const orderSheet = {items: [...filteringOrderList], ...orderInfo}
        console.log("orderSheet")
        console.log(orderSheet)

        addMutation.mutate(orderSheet)
    }

    const addBtnHandler = () => {
        setOrders([...orders, {...orderInit}])
    }

    useEffect(() => {
        const totalPrice = orders.reduce((total, current, idx) => {
            const price = current.price === undefined ? 0 : current.price
            const qty = current.qty === undefined ? 0 : current.qty
            return total + (price * qty)
        }, 0)

        setTotal(totalPrice)
    }, [orders]);

    const changeNameHandler = (e, index) => {
        //name 으로 products 에서 product 찾기
        const select = products.find((element) => element.name === e.target.value)

        const list = [...orders]
        list[index] = {...select}
        setOrders(list)

    }

    const changeQtyHandler = (e, index) => {

        const list = [...orders]
        const item = list[index]
        list[index] = {...item, qty: e.target.value}
        setOrders(list)
    }

    const removeSelectBox = (index) => {

        const list = [...orders]
        list.splice(index, 1)
        setOrders(list)

    }

    const orderInfoChangeHandler = (e) => {
        orderInfo[e.target.name] = e.target.value
        setOrderInfo({...orderInfo})
    }

    const closeModal = () => {
        navigate({
            pathname: '../'
        })
    }

    return (
        <BasicLayout>

            {addMutation.isPending ? <FetchingModal/> : <></>}

            {addMutation.isSuccess ?
                <ResultModal title={'주문 결과'}
                             content={`주문이 정상 처리되었습니다. ^^ (주문번호 : ${addMutation.data.RESULT})
                                        입금 확인 후 배송해 드리겠습니다!
                                        감사합니다!^^`}
                             callbackFn={closeModal}/>
                : <></>}

            <div className="w-full">
                <form id="orderForm">
                <Table borderless={true}>
                    <thead>
                        <tr>
                            <th width={50}>#</th>
                            <th>상품</th>
                            <th width={75}>수량</th>
                            <th width={100}>금액</th>
                            <th width={50}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Form.Select size="sm"
                                                 name="name"
                                                 value={order.name}
                                                 aria-placeholder="상품을 고르세요."
                                                 onChange={(e) => changeNameHandler(e, index)}>
                                        {products.map(item =>
                                            !item.selected ?
                                                <option key={item.pno} value={item.name}>
                                                    {item.name}({item.description}) &nbsp;&nbsp;
                                                    ₩{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                </option>
                                                :
                                                <option disabled={true} key={item.pno}>{item.name}</option>)}
                                    </Form.Select>
                                </td>
                                <td>
                                    <Form.Select size="sm"
                                                 name="qty"
                                                 value={order.qty}
                                                 onChange={(e) => changeQtyHandler(e, index)}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <NumericFormat value={order.price * order.qty} thousandSeparator=","/>
                                </td>
                                <td>
                                    <Button variant="danger"
                                            size="sm"
                                            onClick={() => removeSelectBox(index)}>
                                        -
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td align={"right"}>합계 :</td>
                            <td><NumericFormat
                                value={total}
                                thousandSeparator=","/>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                </form>
                <div className="flex justify-content-between mx-3">
                    <div align="left">
                        {orders.length < 5 && (
                            <Button variant="primary"
                                    size="sm"
                                    onClick={addBtnHandler}>
                                +
                            </Button>
                        )}
                    </div>
                    <div className="flex mx-3">
                        <div>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="동"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="dong"
                                    value={orderInfo.dong}
                                    type="number"
                                    onChange={orderInfoChangeHandler}
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="호"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="ho"
                                    value={orderInfo.ho}
                                    type="number"
                                    onChange={orderInfoChangeHandler}
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="입금자명"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="account"
                                    value={orderInfo.account}
                                    onChange={orderInfoChangeHandler}
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="현금영수증"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="cashReceipt"
                                    value={orderInfo.cashReceipt}
                                    onChange={orderInfoChangeHandler}
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <Button variant="success"
                                    size="sm"
                                    onClick={orderBtnHandler}>
                                주문
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default OrderPage;