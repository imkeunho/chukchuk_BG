import {useRecoilState} from "recoil";
import {orderState} from "../atom/OrderState";

const useCustomOrder = () => {

    const [orders, setOrders] = useRecoilState(orderState)

    const addOrder = (product) => {
        setOrders(orders.concat(product))
    }

    const removeOrder = (order) => {
        const modifiedOrders = orders.filter((item) => item.ono !== order.ono)

        setOrders(modifiedOrders)
    }

    const modifyOrder = (item) => {

        let orderList = orders.map((order) => {
            if (item.ono === order.ono) {
                return {...order, name: item.name, qty: item.qty, price: item.price}
            } else {
                return order
            }
        })

        setOrders(orderList)
    }

    const orderCheck = (selectedProduct) => {
        let res = false;
        orders.forEach((order) => {
            console.log("order.ono :" + order.ono)
            console.log("selected.ono :" + selectedProduct.ono)
            res = order.ono === selectedProduct.ono
        })

        console.log("checked")
        console.log(res)

        return res
    }

    return {orders, setOrders, orderCheck, addOrder, removeOrder, modifyOrder}
}

export default useCustomOrder;