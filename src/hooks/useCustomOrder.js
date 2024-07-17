import {useRecoilState} from "recoil";
import {orderState} from "../atom/OrderState";

const useCustomOrder = () => {

    const [orders, setOrders] = useRecoilState(orderState)

    const addOrder = (product) => {
        setOrders(orders.concat(product))
    }

    const removeOrder = (product) => {
        const modifiedOrders = orders.filter((order) => order.id !== product.id)

        setOrders(modifiedOrders)
    }

    const modifyOrder = (product) => {

        let orderList = [...orders].map((order) => {
            if (order.id === product.id) {
                return {...order, qty: product.qty}
            } else {
                return order
            }
        })

        setOrders(orderList)
    }

    const orderCheck = (productId) => {
        let res = false;
        [...orders].forEach((order) => {
            res = order.id === productId
        })
        return res
    }

    return {orders, setOrders, orderCheck, addOrder, removeOrder, modifyOrder}
}

export default useCustomOrder;