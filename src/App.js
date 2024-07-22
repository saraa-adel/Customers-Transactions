import Layout from './Component/Layout/Layout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Customers from './Component/Customers/Customers.jsx'
import Transaction from './Component/Transaction/Transaction.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function App() {

  let routers = createBrowserRouter([
    {path:'' ,element: <Layout/>, children: [
      {index: true ,element: <Customers/>},
      {path: 'transaction/:id' ,element: <Transaction/>},
      {path: '*' ,element: <NotFound/>},
    ]}
  ])


  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}