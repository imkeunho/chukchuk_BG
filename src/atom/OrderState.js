import {atom, selector} from "recoil";

export const orderState = atom({
    key: 'orderState',
    default: []
})


export const orderTotalState = selector({
    key: 'orderTotalState',
    get: ({get}) => {
        const arr = get(orderState);
        const initialValue = 0

        return arr.reduce((total, current) => total + current.price * current.qty, initialValue);
    }
})