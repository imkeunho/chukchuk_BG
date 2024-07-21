import {lazy, Suspense} from "react";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading...</div>
const Order = lazy(() => import("../pages/OrderPage"))
const Item = lazy(() => import("../pages/ItemPage"))
const Main = lazy(() => import("../pages/MainPage"))
const Admin = lazy(() => import("../pages/AdminPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "order",
        element: <Suspense fallback={Loading}><Order/></Suspense>
    },
    {
        path: "item",
        element: <Suspense fallback={Loading}><Item/></Suspense>
    },
    {
        path: "admin",
        element: <Suspense fallback={Loading}><Admin/></Suspense>
    }
])

export default root;