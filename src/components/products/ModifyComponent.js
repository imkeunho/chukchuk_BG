import React, {useEffect, useRef, useState} from 'react';
import {API_SERVER_HOST, deleteOne, getOne, putOne} from "../../api/productApi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ResultModal from "../common/ResultModal";
import FetchingModal from "../common/FetchingModal";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

const initState = {
    pno: 0,
    name: '',
    description: '',
    price: 0,
    deleted: false,
    uploadFileNames: []
}

const host = API_SERVER_HOST;

function ModifyComponent() {

    const {pno} = useParams();

    const [product, setProduct] = useState(initState);

    const navigate = useNavigate();

    const delMutation = useMutation({
        mutationFn: (pno) => deleteOne(pno)
    });

    const modMutation = useMutation({
        mutationFn: (product) => putOne(pno, product)
    })

    const query = useQuery({
        queryKey: ['products', pno],
        queryFn: () => getOne(pno),
        staleTime: Infinity
    });

    useEffect(() => {

        if (query.isSuccess) {
            setProduct(query.data);
        }

    }, [pno, query.data, query.isSuccess]);

    const uploadRef = useRef();

    const handleChangeProduct = (e) => {

        product[e.target.name] = e.target.value;

        setProduct({...product});
    }

    const deleteOldImages = (imageName) => {

        product.uploadFileNames = product.uploadFileNames.filter(filename => filename !== imageName);

        setProduct({...product});
    }

    const handleClickModify = () => {

        const files = uploadRef.current.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {

            formData.append('files', files[i]);
        }

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("deleted", product.deleted);

        for (let i = 0; i < product.uploadFileNames.length; i++) {

            formData.append("uploadFileNames", product.uploadFileNames[i]);
        }

        //Mutation
        modMutation.mutate(formData);

    }

    const handleClickDelete = () => {

        delMutation.mutate(pno);
    }

    const queryClient = useQueryClient()

    const closeModal = () => {

        queryClient.invalidateQueries(['products', pno]);
        queryClient.invalidateQueries('products/list');

        if (delMutation.isSuccess) {
            navigate({
                pathname: '../list'
            })
        }

        if (modMutation.isSuccess) {
            navigate({
                pathname: `../pno/${pno}`
            })
        }
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {query.isFetching || delMutation.isPending || modMutation.isPending ? <FetchingModal/> : <></>}

            {delMutation.isSuccess || modMutation.isSuccess ?
                <ResultModal
                    title={'처리 결과'}
                    content={'정상적으로 처리 되었습니다.'}
                    callbackFn={closeModal}/>
                :
                <></>
            }

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="name"
                           type={'text'}
                           value={product.name}
                           onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                              name="description"
                              rows="4"
                              onChange={handleChangeProduct}
                              value={product.description}>
                        {product.description}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           name="price"
                           type={'number'}
                           value={product.price}
                           onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="deleted"
                            value={product.deleted}
                            onChange={handleChangeProduct}
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef}
                           className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           type={'file'}
                           multiple={true}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">

                        {product.uploadFileNames.map((imgFile, i) =>
                            <div className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                                 key={i}>
                                <button
                                    className="bg-blue-500 text-3xl text-white"
                                    onClick={() => deleteOldImages(imgFile)}>
                                    DELETE
                                </button>
                                <img alt="img"
                                     src={`${host}/api/products/view/s_${imgFile}`}/>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <div className="flex justify-evenly p-4">
                <Button variant="danger"
                        onClick={handleClickDelete}
                        size="lg">Delete</Button>
                <Button variant="warning"
                        onClick={handleClickModify}
                        size="lg">Modify</Button>
            </div>
        </div>
    );
}

export default ModifyComponent;