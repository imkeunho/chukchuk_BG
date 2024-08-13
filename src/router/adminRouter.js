import {lazy, Suspense} from "react";

const Loading = <div>Loading...</div>

const ProductAdd = lazy(() => import("../components/products/AddComponent"))
const OrderSheet = lazy(() => import("../components/order/OrderSheetComponent"))
const Login = lazy(() => import("../components/member/LoginComponent"))

const adminRouter = () => {
    return [
        {
            path: "add",
            element: <Suspense fallback={Loading}><ProductAdd/></Suspense>
        },
        {
            path: "order",
            element: <Suspense fallback={Loading}><OrderSheet/></Suspense>
        },
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        }
    ]
}

export default adminRouter