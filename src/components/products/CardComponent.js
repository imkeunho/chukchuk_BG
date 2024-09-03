import React from 'react';
import {Button, Card} from "react-bootstrap";
import {API_SERVER_HOST} from "../../api/productApi";
import useCustomCart from "../../hooks/useCustomCart";
import {useNavigate} from "react-router-dom";

const host = API_SERVER_HOST

function CardComponent({product}) {

    const {addItem} = useCustomCart();

    const navigate = useNavigate();

    const clickHandler = (pno) => {
        navigate({
            pathname: `../pno/${pno}`
        })
    }
    return (
        <>
            <Card className="m-1 flex flex-row" style={{height: '9rem'}}>
                <Card.Img variant="left"
                          style={{objectFit: "cover", width: '10rem'}}
                          src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                          onClick={() => clickHandler(product.pno)}/>
                <Card.Body className="ml-5">
                    <Card.Title onClick={() => clickHandler(product.pno)}>
                        {product.name.toString().substring(0, 10)}
                    </Card.Title>
                    <Card.Text>
                        {product.description ? product.description.toString().substring(0, 12) : <>&nbsp;</>}
                    </Card.Text>
                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    &nbsp;&nbsp;<Button size="sm"
                                        variant="primary"
                                        onClick={() => addItem(product.pno)}>담기</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardComponent;