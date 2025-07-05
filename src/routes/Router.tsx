import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import ErrorRouter from "@/pages/errorPage/ErrorRouter";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorRouter />,
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/books",
            element: <AllBooks />
        }
    ]
  },
]);