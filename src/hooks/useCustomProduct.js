import {useRecoilState} from "recoil";
import {productState} from "../atom/productState";
import {useQuery} from "@tanstack/react-query";
import {getList} from "../api/productApi";
import {useEffect} from "react";

const useCustomProduct = () => {

    const [products, setProducts] = useRecoilState(productState);

    const query = useQuery({
        queryKey: ['products'],
        queryFn: getList,
        staleTime: 1000 * 60 * 60
    });

    useEffect(() => {
        if (query.isSuccess) {
            setProducts(query.data)
        }
    }, [query.isSuccess]);

    const setIsSelected = (option, flag) => {
        const optionList = products.map((product) => {
            if (product.name === option.name) {
                return {...product, selected: flag === 1}
            } else {
                return product
            }
        })
        setProducts(optionList)
    }

    return {products, setIsSelected}
}

export default useCustomProduct