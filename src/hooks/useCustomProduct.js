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

    return {products, setProducts}
}

export default useCustomProduct