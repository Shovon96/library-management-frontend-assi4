import App from "@/App";
import ErrorRouter from "@/pages/errorPage/ErrorRouter";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorRouter />,
    element: <App />,
    children: [
        {
            path: "/"
        }
    ]
  },
]);