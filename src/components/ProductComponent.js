import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import useCustomOrder from "../hooks/useCustomOrder";

const initState = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    qty: 0
}

function ProductComponent({id, product}) {

    const {orderCheck, addOrder, removeOrder, modifyOrder} = useCustomOrder()

    const [selectedProduct, setSelectedProduct] = useState(initState);

    const getProduct = (e) => {

        // let productList = [...products].map((product) => {
        //     if (product.name === e.target.value) {
        //         return {...product, selected: true}
        //     } else {
        //         return product
        //     }
        // })
        // setProducts(productList)

        const selected = product.find((element) => element.name === e.target.value)

        setSelectedProduct({...selected})
    }

    const setQty = (e) => {

        selectedProduct[e.target.name] = e.target.value

        setSelectedProduct({...selectedProduct})

        console.log("selected product : ");
        console.log(selectedProduct);

        if (orderCheck(selectedProduct.id)) {
            modifyOrder(selectedProduct)
        } else {
            addOrder(selectedProduct)
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
                             onChange={getProduct}>
                    {product.map(item =>
                        !item.selected ?
                            <option key={item.id}>{item.name}</option>
                            :
                            <option disabled={true} key={item.id}>{item.name}</option>)}
                </Form.Select>
            </td>
            <td>
                <Form.Select size="sm"
                             name="qty"
                             onChange={setQty}>
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
            </td>
        </tr>
    );
}

export default ProductComponent;