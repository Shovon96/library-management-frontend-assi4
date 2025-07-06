import App from "@/App";
import AddBooks from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import ErrorRouter from "@/pages/errorPage/ErrorRouter";
import Home from "@/pages/Home";
import UpdateBook from "@/pages/UpdateBook";
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
        path: "/create-book",
        element: <AddBooks />
      },
      {
        path: "/books",
        element: <AllBooks />
      },
      {
        path: "/books/:id",
        element: <UpdateBook />
      }
    ]
  },
]);