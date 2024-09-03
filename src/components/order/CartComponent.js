import React, {useState} from 'react';
import useCustomCart from "../../hooks/useCustomCart";
import {Button, Card, FormGroup} from "react-bootstrap";
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

        if (cartItems.length === 0) {
            alert("장바구니에 상품이 없습니다. ㅜㅜ")
            return;
        }
        if (orderInfo.dong === '') {
            alert("'동'을 입력해 주세요.")
            return;
        }
        if (orderInfo.ho === '') {
            alert("'호'를 입력해 주세요.")
            return;
        }
        if (orderInfo.account === '') {
            alert("'입금자명'을 입력해 주세요.")
            return;
        }
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
                    <Card key={index} className="m-1 flex flex-row" style={{height: '9rem'}}>
                        <Card.Img variant="left"
                                  style={{objectFit: "cover", width: '10rem'}}
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
                    <div className="mb-3 flex flex-row">
                        <FormGroup controlId="dong" className="mx-3" style={{width: '6rem'}}>
                            <Form.Label>동</Form.Label>
                            <Form.Control name="dong" onChange={orderInfoChangeHandler}/>
                        </FormGroup>

                        <FormGroup controlId="ho" className="mx-3" style={{width: '6rem'}}>
                            <Form.Label>호</Form.Label>
                            <Form.Control name="ho" onChange={orderInfoChangeHandler}/>
                        </FormGroup>
                    </div>
                    <div className="mb-3 flex flex-row">
                        <FormGroup controlId="account" className="mx-3" style={{width: '7rem'}}>
                            <Form.Label>입금자명</Form.Label>
                            <Form.Control name="account" onChange={orderInfoChangeHandler}/>
                        </FormGroup>

                        <FormGroup controlId="cashReceipt" className="mx-3" style={{width: '10rem'}}>
                            <Form.Label>현금영수증(연락처)</Form.Label>
                            <Form.Control name="cashReceipt" onChange={orderInfoChangeHandler}/>
                        </FormGroup>
                    </div>
                    <div className="flex flex-row">
                        <div className="mx-5 content-center">
                            합계 : {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        </div>
                        <div className="mx-3">
                            <Button onClick={orderBtnHandler}>주문</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default CartComponent;