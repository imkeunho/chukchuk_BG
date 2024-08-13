import React from 'react';
import {Button, Card} from "react-bootstrap";
import {API_SERVER_HOST, getList} from "../../api/productApi";
import {useQuery} from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";
import {useNavigate} from "react-router-dom";
import useCustomCart from "../../hooks/useCustomCart";

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const host = API_SERVER_HOST

function ListComponent() {

    const {addItem} = useCustomCart();

    const navigate = useNavigate();

    const {data, isFetching} = useQuery({
        queryKey: ['products/list'],
        queryFn: () => getList({page: 1, size: 100}),
        staleTime: 1000 * 60 * 60
    });

    const serverData = data || initState

    const clickHandler = (pno) => {
        navigate({
            pathname: `../pno/${pno}`
        })
    }

    return (
        <>
            {isFetching ? <FetchingModal/> :<></>}

            <div>
                {serverData?.dtoList?.map((item, index) =>
                    <Card key={index} className="m-1 flex flex-row">
                        <Card.Img variant="left"
                                  className="w-40"
                                  src={`${host}/api/products/view/s_${item.uploadFileNames[0]}`}
                                  onClick={() => clickHandler(item.pno)}/>
                        <Card.Body className="ml-8">
                            <Card.Title onClick={() => clickHandler(item.pno)}>{item.name}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                            &nbsp;&nbsp;<Button size="sm"
                                                variant="primary"
                                                onClick={() => addItem(item.pno)}>담기</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    );
}

export default ListComponent;