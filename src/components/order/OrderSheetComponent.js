import React, {useEffect, useState} from 'react';
import {Accordion, Button, Table} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FetchingModal from "../common/FetchingModal";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteOne, getItem, getList, putFreezing, putOneComplete, putOnePayment} from "../../api/orderApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const orderSheetInit = [{
    oid: 0,
    dong: 0,
    ho: 0,
    account: '',
    cashReceipt: '',
    payment: false,
    complete: false,
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

    const {exceptionHandle} = useCustomLogin();

    const [dong, setDong] = useState(0);
    const [dongList, setDongList] = useState([]);

    const queryClient = useQueryClient();

    const {data, isFetching, isSuccess, isFetched} = useQuery({
        queryKey: ['orderSheet'],
        queryFn: getList,
        staleTime: 1000 * 60 * 5
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
        }).catch(err => exceptionHandle(err));

    }, [dong]);

    const changeHandler = (e) => {

        const selectedDong = parseInt(e.target.value)
        setDong(selectedDong)

        if (selectedDong === 0) {
            setFiltering(data)
            return
        }

        const filteringList = [...data].filter(order => order.dong === selectedDong)
        setFiltering(filteringList)
    }

    const completeBtnHandler = (e) => {
        const ono = e.target.value

        putOneComplete(ono).then(data => {
            callBack(data)
        })

    }

    const paymentBtnHandler = (e) => {
        const ono = e.target.value

        putOnePayment(ono).then(data => {
            callBack(data)
        })
    }

    const deleteBtnHandler = (e) => {
        const ono = e.target.value

        deleteOne(ono).then(data => {
            callBack(data)
        })
    }

    const initialization = () => {
        if (window.confirm('경고! 모든 주문이 초기화 됩니다. 진행하시겠습니까?')) {
            if (window.confirm('정말 초기화 됩니다?')) {
                putFreezing().then(data => {
                    callBack(data)
                })
            }
        }
    }

    const callBack = (data) => {
        if (data.RESULT === 'SUCCESS') {
            queryClient.invalidateQueries(['orderSheet'])
        } else {
            alert("서버오류. 관리자에 문의해주세요.")
        }
    }

    return (
        <>
            {isFetching ? <FetchingModal/> : <></>}

            <div className="p-1 flex flex-row">
                <div className="flex flex-row-reverse w-20 px-3">동 : </div>
                <div className="w-20 mr-10">
                    <Form.Select name="dong"
                                 size="sm"
                                 value={dong}
                                 onChange={changeHandler}>
                        <option value={0}>ALL</option>
                        {dongList?.map(dong =>
                        <option key={dong} value={dong}>{dong}</option>)}
                    </Form.Select>
                </div>
                <div className="w-25 bg-[#FFF5E4] mr-5 flex justify-center items-center">입금확인 건</div>
                <div className="w-25 bg-[#FFE3E1] flex justify-center items-center">주문완료 건</div>
            </div>

            <Accordion className="p-1 mb-3" alwaysOpen>
                {filtering && filtering?.map((order, index) => (
                    <Accordion.Item key={order.oid} eventKey={index}>
                        <Accordion.Button style={order.complete ? {backgroundColor: '#FFE3E1'} : order.payment ? {backgroundColor : '#FFF5E4'} : {}}>
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
                                    disabled={order.complete}
                                    value={order.oid} onClick={paymentBtnHandler}>
                                {order.payment ? '입금취소' : '입금완료'}
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="success"
                                    size="sm"
                                    disabled={order.complete}
                                    value={order.oid} onClick={completeBtnHandler}>
                                배달완료
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger"
                                    size="sm"
                                    value={order.oid} onClick={deleteBtnHandler}>
                                주문삭제
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <div className="p-1">
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
                            <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Button variant="danger"
                        size="sm"
                        onClick={initialization}>
                    주문 초기화
                </Button>
            </div>
        </>
    );
}


export default OrderSheetComponent;