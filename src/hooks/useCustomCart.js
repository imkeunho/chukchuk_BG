import {useRecoilState} from "recoil";
import {cartState} from "../atom/cartState";
import {getOne} from "../api/productApi";

const useCustomCart = () => {

    const [cartItems, setCartItems] = useRecoilState(cartState)

    const addItem = (pno) => {

        const addedItem = cartItems.filter(item => item.pno === pno)[0]

        if (addedItem) {
            if (window.confirm('이미 추가된 상품 입니다. 수량을 추가 하시겠습니까?') === false) {
                return;
            }

            setCartItems(updateQty(pno, 1))

        } else {
            getOne(pno).then(data => {
                data.qty = 1
                console.log(data)
                setCartItems(cartItems.concat(data))
            })
            window.confirm('장바구니 담기 완료!')
        }

    }

    const removeItem = (pno) => {
        const targetItem = cartItems.filter(item => item.pno === pno)[0]

        if (targetItem.qty === 1) {
            if (window.confirm('상품을 삭제 하시겠습니까?') === false) {
                return;
            }

            const modifiedCartItems = cartItems.filter(item => item.pno !== pno)
            setCartItems(modifiedCartItems)
        } else {
            setCartItems(updateQty(pno, -1))
        }
    }

    const updateQty = (pno, num) => {

        return cartItems.map(item => {

            const currQty = item.qty

            if (item.pno === pno) {
                return {...item, qty: currQty + num}
            } else {
                return item
            }
        });
    }

    return {addItem, removeItem, cartItems}

}

export default useCustomCart