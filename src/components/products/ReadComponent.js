import React from 'react';
import {Button, Card} from "react-bootstrap";
import {API_SERVER_HOST, getOne} from "../../api/productApi";
import {useQuery} from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";
import {useNavigate, useParams} from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";

const initState = {
    pno: 0,
    name: '',
    description: '',
    price: 0,
    createdAt: '',
    uploadFileNames: []
}

const host = API_SERVER_HOST

function ReadComponent() {

    const {pno} = useParams();

    const {isLogin} = useCustomLogin()

    const {addItem} = useCustomCart();

    const navigate = useNavigate()

    const {data, isFetching} = useQuery({
        queryKey: ['products', pno],
        queryFn: () => getOne(pno),
        staleTime: 1000 * 60 * 60
    });

    const product = data || initState

    const modifyBtnHandler = () => {
        navigate({
            pathname: `../modify/${pno}`
        })
    }
    return (
        <>
            {isFetching ? <FetchingModal/> :<></>}

            <div className="m-1 flex justify-center">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={`${host}/api/products/view/${product.uploadFileNames[0]}`}/>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        &nbsp;&nbsp;<Button variant="primary"
                                            onClick={() => addItem(product.pno)}>담기</Button>
                        {isLogin ?
                            <>
                                &nbsp;&nbsp;<Button variant="warning"
                                                    onClick={modifyBtnHandler}>Modify</Button>
                            </>
                            :
                            <></>}
                    </Card.Body>
                    <Card.Footer className="text-xs">
                        등록일 : {product.createdAt}
                    </Card.Footer>
                </Card>
            </div>
        </>
    );
}

export default ReadComponent;