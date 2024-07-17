import {lazy, Suspense} from "react";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const Item = lazy(() => import("../pages/ItemPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "item",
        element: <Suspense fallback={Loading}><Item/></Suspense>
    }
])

export default root;