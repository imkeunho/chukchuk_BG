import {lazy, Suspense} from "react";
import adminRouter from "./adminRouter";
import mainRouter from "./mainRouter";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const Admin = lazy(() => import("../pages/admin/IndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>,
        children: mainRouter()
    },
    {
        path: "admin",
        element: <Suspense fallback={Loading}><Admin/></Suspense>,
        children: adminRouter()
    }
])

export default root;