import React, {useRef, useState} from 'react';
import {postAdd} from "../../api/productApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    name: '',
    description: '',
    price: 0,
    files: []
}

// new FormData() -> POST, PUT

function AddComponent() {

    const [product, setProduct] = useState(initState);

    const uploadRef = useRef();

    const {exceptionHandle} = useCustomLogin();

    const navigate = useNavigate();

    const addMutation = useMutation({
        mutationFn: (product) => postAdd(product).catch(err => exceptionHandle(err))
    });

    //multipart/form-data  FormData()

    const handleChangeProduct = (e) => {

        product[e.target.name] = e.target.value;

        setProduct({...product});
    }

    const handleClickAdd = () => {

        console.log(product);

        const formData = new FormData();

        const files = uploadRef.current.files;

        for (let i = 0; i < files.length; i++) {

            formData.append("files", files[i]);

        }
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);

        console.log(formData);
        console.log(formData.get(files));

        addMutation.mutate(formData);
    }

    const queryClient = useQueryClient();

    const closeModal = () => {

        queryClient.invalidateQueries("products/list");

        // moveToList({page : 1});
        navigate({
            pathname: '/'
        })
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">

            {addMutation.isPending ? <FetchingModal/> : <></>}

            {addMutation.isSuccess ?
                <ResultModal
                    title={'Product Add Result'}
                    content={`${addMutation.data.RESULT}번 상품 등록 완료`}
                    callbackFn={closeModal}
                />
                : <></>
            }
            <div className="mb-4">
                * Product Name은 상품목록에선 10글자만 보임 <br/>
                * Desc는 상품목록에선 12글자만 보임 <br/>
            </div>
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
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                           ref={uploadRef}
                           type={'file'}
                           multiple={true}>
                    </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <Button variant="primary"
                            onClick={handleClickAdd}
                            size="lg">Add</Button>
                </div>
            </div>
        </div>
    );
}

export default AddComponent;