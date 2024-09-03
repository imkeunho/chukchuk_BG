import React, {useEffect} from 'react';
import useCustomProduct from "../../hooks/useCustomProduct";
import CardComponent from "./CardComponent";
import {useInView} from "react-intersection-observer";
import PlaceholderComponent from "./PlaceholderComponent";

function ListComponent() {

    const {data,isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError} = useCustomProduct();

    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView]);

    if (isError) {
        alert('점검중 입니다.')
    }

    return (
        <>
            {isLoading ? <PlaceholderComponent/> : <></>}

            <div>
                {data && data.pages.map((pageData) => {
                    const products = pageData.dtoList;
                    return products.map((product, index) =>
                        <CardComponent key={index} product={{...product}}/>
                    )
                })}
                {data && (isFetchingNextPage ? <PlaceholderComponent/> : hasNextPage ? <div ref={ref}>&nbsp;</div> : <></>)}
            </div>
        </>
    );
}

export default ListComponent;