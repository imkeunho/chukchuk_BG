import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <div>Loading...</div>

const ProductList = lazy(() => import("../components/products/ListComponent"))
const ProductRead = lazy(() => import("../components/products/ReadComponent"))
const Cart = lazy(() => import("../components/order/CartComponent"))
const ProductModify = lazy(() => import("../components/products/ModifyComponent"))

const mainRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace={true} to={'list'}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductList/></Suspense>
        },
        {
            path: "cart",
            element: <Suspense fallback={Loading}><Cart/></Suspense>
        },
        {
            path: "pno/:pno",
            element: <Suspense fallback={Loading}><ProductRead/></Suspense>
        },
        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><ProductModify/></Suspense>
        }
    ]
}

export default mainRouter