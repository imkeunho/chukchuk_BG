import {atom, selector} from "recoil";

export const cartState = atom({
    key: 'cartState',
    default: []
});

export const cartTotalPrice = selector({
    key: 'cartTotalPrice',
    get: ({get}) => {

        const arr = get(cartState);

        const initialValue = 0

        return arr.reduce((total, current) => total + current.price * current.qty, initialValue);
    }
});

export const cartTotalCnt = selector({
    key: 'cartTotalCnt',
    get: ({get}) => {

        const arr = get(cartState);

        const initialValue = 0

        return arr.reduce((total, current) => total + current.qty, initialValue);
    }
});