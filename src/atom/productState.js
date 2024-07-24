import {atom} from "recoil";

export const productState = atom({
    key: 'productState',
    default: [{
        pno: '',
        name: '',
        description: '',
        price: 0,
        qty: 0,
        deleted: false
    }]
})
