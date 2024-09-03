import {useInfiniteQuery} from "@tanstack/react-query";
import {getList} from "../api/productApi";

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO: null,
    prev: false,
    next: false,
    hasNext: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const useCustomProduct = () => {

    const {data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError} = useInfiniteQuery({
        queryKey: ['paging'],
        queryFn: ({pageParam}) => getList({page: pageParam, size: 10}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.current + 1 : undefined;
        },
        staleTime: 1000 * 60 * 60
    });

    return {data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError}
}

export default useCustomProduct