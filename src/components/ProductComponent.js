import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import useCustomOrder from "../hooks/useCustomOrder";

const initState = {
    ono: 0,
    pno: 0,
    name: '',
    description: '',
    price: 0,
    qty: 0
}

function ProductComponent({id, product}) {

    const {orderCheck, addOrder, removeOrder, modifyOrder} = useCustomOrder()

    const [selectedProduct, setSelectedProduct] = useState(initState);

    const changeNameHandler = (e) => {

        //name 으로 products 에서 product 찾기
        const selected = product.find((element) => element.name === e.target.value)

        setSelectedProduct({...selected, ono: id, qty: 0})
        console.log("selectedProduct")
        console.log(selected)
        console.log("---------------------------------")
        console.log("selectedProduct")
        console.log(selectedProduct)

        //order 에 등록된 selectBox 인지 확인
        if (orderCheck(selectedProduct)) {
            console.log("name - modify call")
            modifyOrder(selectedProduct)
        } else {
            console.log("name - add call")
            addOrder(selectedProduct)
        }
    }

    const changeQtyHandler = (e) => {

        selectedProduct[e.target.name] = e.target.value

        setSelectedProduct({...selectedProduct})


        if (orderCheck(selectedProduct)) {
            console.log("수량변경 이건 무조건임...!!")
            modifyOrder(selectedProduct)
        }
    }

    const removeSelectBox = (index) => {

        //해당 주문 삭제
        removeOrder(selectedProduct)

        //컴포넌트 삭제
        document.getElementById(`box-${index}`).remove()

    }

    return (
        <tr id={`box-${id}`}>
            <td>{id}</td>
            <td>
                <Form.Select size="sm"
                             name="name"
                             value={selectedProduct.name}
                             onChange={changeNameHandler}>
                    {product.map(item =>
                        !item.selected ?
                            <option key={item.pno}>{item.name}</option>
                            :
                            <option disabled={true} key={item.pno}>{item.name}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Select size="sm"
                             name="qty"
                             onChange={changeQtyHandler}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Select>
            </td>
            <td>
                {selectedProduct.price * selectedProduct.qty}
            </td>
            <td>
                <Button variant="danger"
                        size="sm"
                        onClick={() => removeSelectBox(id)} >
                    -
                </Button>
                <Button onClick={() => console.log(selectedProduct)}>sel</Button>
                <Button onClick={() => console.log(id)}>id</Button>
            </td>
        </tr>
    );
}

export default ProductComponent;