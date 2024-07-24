import React, {useEffect, useState} from 'react';
import {Accordion, Button, Table} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FetchingModal from "../common/FetchingModal";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteOne, getItem, getList, putOne} from "../../api/orderApi";

const orderSheetInit = [{
    oid: 0,
    dong: 0,
    ho: 0,
    account: '',
    cashReceipt: '',
    payment: false,
    items: [{
        pno: 0,
        qty: 0,
        price: 0,
        name: ''
    }]
}]

const orderItemInit = [{
    pno: 0,
    name: '',
    qty: 0,
    price: 0
}]

function OrderSheetComponent() {

    const [filtering, setFiltering] = useState(orderSheetInit);

    const [orderItem, setOrderItem] = useState(orderItemInit);

    const [dong, setDong] = useState(0);
    const [dongList, setDongList] = useState([]);

    const queryClient = useQueryClient();

    const {data, isFetching, isSuccess, isFetched} = useQuery({
        queryKey: ['orderSheet'],
        queryFn: getList,
        staleTime: 1000 * 30
    })

    useEffect(() => {

        if (isSuccess) {
            setFiltering(data)

            const result = new Set(data.map(order => order.dong).sort())
            const list = [...result]
            setDongList(list)
        }
    }, [data, isFetched, isSuccess]);

    useEffect(() => {

        getItem(dong).then(data => {
            setOrderItem(data)
        })

    }, [dong, filtering]);

    const changeHandler = (e) => {

        const selectedDong = parseInt(e.target.value)
        console.log(selectedDong)
        setDong(selectedDong)

        if (selectedDong === 0) {
            setFiltering(data)
            return
        }

        const filteringList = [...data].filter(order => order.dong === selectedDong)
        console.log(filteringList)
        setFiltering(filteringList)
    }

    const completeBtnHandler = (e) => {
        const ono = e.target.value

        deleteOne(ono).then(data => {

            if (data.RESULT === 'SUCCESS') {
                queryClient.invalidateQueries(['orderSheet'])
            } else {
                alert("서버오류. 관리자에 문의해주세요.")
            }

        })
    }

    const paymentBtnHandler = (e) => {
        const ono = e.target.value

        putOne(ono).then(data => {

            if (data.RESULT === 'SUCCESS') {
                queryClient.invalidateQueries(['orderSheet'])
            } else {
                alert("서버오류. 관리자에 문의해주세요.")
            }
        })
    }

    return (
        <>
            {isFetching ? <FetchingModal/> : <></>}

            <div className="flex flex-row">
                <div className="flex flex-row-reverse w-20 px-3">동 : </div>
                <div className="w-20">
                    <Form.Select name="dong"
                                 size="sm"
                                 value={dong}
                                 onChange={changeHandler}>
                        <option value={0}>ALL</option>
                        {dongList?.map(dong =>
                        <option key={dong} value={dong}>{dong}</option>)}
                    </Form.Select>
                </div>
            </div>

            <Accordion alwaysOpen>
                {filtering && filtering?.map((order, index) => (
                    <Accordion.Item key={order.oid} eventKey={index}>
                        <Accordion.Button style={order.payment ? {backgroundColor: 'yellow'} : {}}>
                            {order.dong}동 {order.ho}호 / &nbsp;&nbsp;
                            금액 : {order.items.reduce((total, current) =>
                                    {return total + (current.qty * current.price)}, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / &nbsp;&nbsp;
                            입금자명 : {order.account} &nbsp;&nbsp;
                            현금영수증 : {order.cashReceipt}
                        </Accordion.Button>
                        <Accordion.Body>
                            {order?.items.map((item, index) => (
                                <div key={index}>No.{index + 1} / {item.name} / {item.qty} / total : {(item.qty * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                            ))}
                            <Button variant="primary"
                                    size="sm"
                                    disabled={order.payment}
                                    value={order.oid} onClick={paymentBtnHandler}>
                                {order.payment ? '입금완료' : '입금확인'}
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="success"
                                    size="sm"
                                    value={order.oid} onClick={completeBtnHandler}>
                                주문완료
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>주문수량</th>
                    </tr>
                </thead>
                <tbody>
                {orderItem && orderItem?.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}


export default OrderSheetComponent;