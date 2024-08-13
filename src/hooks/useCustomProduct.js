import {useRecoilState} from "recoil";
import {productState} from "../atom/productState";
import {useQuery} from "@tanstack/react-query";
import {getList} from "../api/productApi";
import {useEffect} from "react";

const useCustomProduct = () => {

    const [products, setProducts] = useRecoilState(productState);

    const {data, isFetched, isSuccess} = useQuery({
        queryKey: ['products'],
        queryFn: getList,
        staleTime: 1000 * 60 * 60
    });

    useEffect(() => {
        if (isSuccess) {
            setProducts(data)
        }
    }, [data, isSuccess, isFetched]);

    return {products}
}

export default useCustomProduct