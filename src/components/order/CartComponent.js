import React, {useState} from 'react';
import useCustomCart from "../../hooks/useCustomCart";
import {Button, Card, Col, FormGroup, Row} from "react-bootstrap";
import {API_SERVER_HOST, submit} from "../../api/productApi";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {cartState, cartTotalPrice} from "../../atom/cartState";
import Form from "react-bootstrap/Form";
import {useMutation} from "@tanstack/react-query";
import ResultModal from "../common/ResultModal";
import FetchingModal from "../common/FetchingModal";
import {useNavigate} from "react-router-dom";

const host = API_SERVER_HOST

const orderInfoInit = {
    dong: '',
    ho: '',
    account: '',
    cashReceipt: ''
}

function CartComponent(props) {

    const {cartItems, addItem, removeItem} = useCustomCart();

    const [orderInfo, setOrderInfo] = useState(orderInfoInit);

    const resetCartState = useResetRecoilState(cartState)

    const totalPrice = useRecoilValue(cartTotalPrice)

    const navigate = useNavigate()

    const addMutation = useMutation({
        mutationFn: (orderSheet) => submit(orderSheet)
    })

    const orderBtnHandler = () => {

        const orderSheet = {items: [...cartItems], ...orderInfo}
        console.log("orderSheet")
        console.log(orderSheet)

        addMutation.mutate(orderSheet)

    }

    const orderInfoChangeHandler = (e) => {
        orderInfo[e.target.name] = e.target.value
        setOrderInfo({...orderInfo})
    }

    const closeModal = () => {
        resetCartState();
        navigate({
            pathname: '/'
        })
    }

    return (
        <>
            {addMutation.isPending ? <FetchingModal/> : <></>}

            {addMutation.isSuccess ?
                <ResultModal title={'주문 결과'}
                             content={`주문이 정상 처리되었습니다. ^^
                                        입금 확인 후 배송해 드리겠습니다!
                                        감사합니다!^^`}
                             callbackFn={closeModal}/>
                : <></>}

            <div className="mb-4">
                {cartItems?.map((item, index) =>
                    <Card key={index} className="m-1 flex flex-row">
                        <Card.Img variant="left"
                                  className="w-40"
                                  src={`${host}/api/products/view/s_${item.uploadFileNames[0]}`}/>
                        <Card.Body className="ml-5">
                            <Card.Title>{item.name.toString().substring(0, 10)}</Card.Title>
                            <Card.Text>
                                {(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                            </Card.Text>
                            <Button size="sm"
                                    variant="danger"
                                    onClick={() => removeItem(item.pno)}>-</Button>
                            &nbsp;&nbsp;{item.qty}&nbsp;&nbsp;
                            <Button size="sm"
                                    variant="primary"
                                    onClick={() => addItem(item.pno)}>+</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <div className="m-1">
                <p>주문 정보</p>
                <Form>
                    <div className="mb-3 flex justify-evenly">
                        <FormGroup controlId="dong">
                            <Form.Label>동</Form.Label>
                            <Form.Control name="dong" onChange={orderInfoChangeHandler}/>
                        </FormGroup>

                        <FormGroup controlId="ho">
                            <Form.Label>호</Form.Label>
                            <Form.Control name="ho" onChange={orderInfoChangeHandler}/>
                        </FormGroup>
                    </div>
                    <div className="mb-3 flex justify-evenly">
                        <FormGroup controlId="account">
                            <Form.Label>입금자명</Form.Label>
                            <Form.Control name="account" onChange={orderInfoChangeHandler}/>
                        </FormGroup>

                        <FormGroup controlId="cashReceipt">
                            <Form.Label>현금영수증(연락처)</Form.Label>
                            <Form.Control name="cashReceipt" onChange={orderInfoChangeHandler}/>
                        </FormGroup>
                    </div>
                    <div className="flex justify-around">
                        <div>
                            합계 : {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        </div>
                        <div>
                            <Button onClick={orderBtnHandler}>주문</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default CartComponent;