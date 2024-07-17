import React, {useEffect, useState} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {Button, Table} from "react-bootstrap";
import useCustomProduct from "../hooks/useCustomProduct";

function ItemPage(props) {

    const {products} = useCustomProduct();

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(items.concat(products))

    }, [products]);

    const removeItem = (deleteItem) => {
        const modifiedItems = items.filter((item) => item.id !== deleteItem.id)
        setItems(modifiedItems)
    }

    return (
        <BasicLayout>
            <div className="w-full px-3">
                <Table borderless={true}>
                    <thead>
                        <tr>
                            <th>상품</th>
                            <th>상세</th>
                            <th>금액</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item) =>
                        <tr id={`item-${item.id}`}
                            key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td><Button variant="danger"
                                        size="sm"
                                        onClick={() => removeItem(item)}>-</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <div>

                </div>
                <div>
                    <Button onClick={() => console.log(products)}>추가</Button>
                    <Button onClick={() => console.log(items)}>등록</Button>
                </div>
            </div>
        </BasicLayout>
    );
}

export default ItemPage;