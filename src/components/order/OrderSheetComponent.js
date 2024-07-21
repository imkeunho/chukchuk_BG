import React from 'react';
import {Accordion} from "react-bootstrap";
import FetchingModal from "../common/FetchingModal";
import {useQuery} from "@tanstack/react-query";
import {getList} from "../../api/orderApi";

const initState = [{
    oid: 0,
    dong: 0,
    ho: 0,
    account: '',
    items: [{
        pno: 0,
        qty: 0,
        price: 0,
        name: ''
    }]
}]

function OrderSheetComponent() {

    const {data, isFetching} = useQuery({
        queryKey: ['orderSheet'],
        queryFn: getList,
        staleTime: 1000 * 60 * 60
    })

    const serverData = data || initState

    return (
        <>
            {isFetching ? <FetchingModal/> : <></>}

            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {serverData && serverData?.map((order, index) => (
                    <Accordion.Item key={order.oid} eventKey={index}>
                        <Accordion.Header>
                            주문번호 : {order.oid} / &nbsp;&nbsp;
                            {order.dong}동 {order.ho}호 / &nbsp;&nbsp;
                            금액 : {order.items.reduce((total, current) =>
                                    {return total + (current.qty * current.price)}, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / &nbsp;&nbsp;
                            입금자명 : {order.account}
                        </Accordion.Header>
                        <Accordion.Body>
                            {order?.items.map((item, index) => (
                                <div key={index}>No.{index + 1} / {item.name} / {item.qty} / total : {(item.qty * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
);
}


export default OrderSheetComponent;