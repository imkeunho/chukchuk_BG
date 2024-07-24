import React, {useEffect, useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {Button, InputGroup, Table, Form} from "react-bootstrap";
import useCustomProduct from "../hooks/useCustomProduct";
import {NumericFormat} from "react-number-format";
import {putList} from "../api/productApi";
import {useMutation} from "@tanstack/react-query";
import FetchingModal from "../components/common/FetchingModal";
import ResultModal from "../components/common/ResultModal";
import {useNavigate} from "react-router-dom";

const initState = {
    pno: 0,
    name: '',
    description: '',
    price: 0,
    qty: 0,
    selected: false
}

function ItemPage(props) {

    const {products} = useCustomProduct();

    const [items, setItems] = useState([]);

    const [inputGroup, setInputGroup] = useState(initState);

    const addMutation = useMutation({
        mutationFn: (item) => putList(item)
    })

    const navigate = useNavigate()

    useEffect(() => {
        setItems(products)

        return () => {
            setItems([])
        }

    }, [products]);


    const removeItem = (index) => {
        const modifiedItems = [...items]
        modifiedItems.splice(index, 1)
        setItems(modifiedItems)
    }

    const inputGroupChangeHandler = (e) => {
        inputGroup[e.target.name] = e.target.value
        setInputGroup({...inputGroup})
    }

    const addBtnHandler = () => {
        setItems([...items, {...inputGroup}])
        setInputGroup({name: '', description: '', price: 0})
    }

    const registerHandler = () => {
        addMutation.mutate(items)
    }

    const closeModal = () => {
        navigate({
            pathname: '../order'
        })
    }

    return (
        <BasicLayout>

            {addMutation.isPending ? <FetchingModal/> : <></>}

            {addMutation.isSuccess ?
                <ResultModal title={'상품 등록 결과'}
                             content={addMutation.data.RESULT}
                             callbackFn={closeModal}/>
                : <></>}

            <div className="w-full">
                <Table borderless={true}>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>상세</th>
                            <th>금액</th>
                            <th width={50}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) =>
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><NumericFormat value={item.price} thousandSeparator=","/></td>
                            <td><Button variant="danger"
                                        size="sm"
                                        onClick={() => removeItem(index)}>-</Button>
                            </td>
                        </tr>)}
                    <tr>
                        <td>
                            <InputGroup size="sm" className="mb-3">
                            <Form.Control
                                placeholder="상품명"
                                aria-describedby="inputGroup-sizing-sm"
                                name="name"
                                value={inputGroup.name}
                                onChange={inputGroupChangeHandler}
                            />
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="상세 설명"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="description"
                                    value={inputGroup.description}
                                    onChange={inputGroupChangeHandler}
                                />
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    placeholder="금액"
                                    aria-describedby="inputGroup-sizing-sm"
                                    name="price"
                                    type="number"
                                    value={inputGroup.price}
                                    onChange={inputGroupChangeHandler}
                                />
                            </InputGroup>
                        </td>
                        <td><Button variant="primary"
                                    size="sm"
                                    onClick={addBtnHandler}
                                    >+</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div align={"right"}>
                    <Button onClick={registerHandler}>등록</Button>
                </div>
            </div>
        </BasicLayout>
    );
}

export default ItemPage;