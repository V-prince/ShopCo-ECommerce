import { Provider, useDispatch } from "react-redux"
import { Home } from "./components/Home"
import ShopStore from './store/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layouts } from "./components/Layouts.jsx"
import { SearchItems } from "./components/SearchItems.jsx"
import { AllItems } from "./components/AllItems.jsx"
import { Loginpage } from "./components/Profilepage.jsx"
import { Signuppage } from "./components/Signuppage.jsx"
import { ToastContainer } from 'react-toastify';
import { MainProfile } from "./components/MainProfile.jsx"
import { Shop } from "./components/Shop.jsx"
import { auth } from "./Firebase.config.js"
import { Carts } from "./components/Carts.jsx"
import HostDashboard from "./components/Host.jsx"
import { useEffect } from "react"
import { ShopItemsAction } from "./store/Shopitem.js"
import { MyProducts } from "./components/HostMyProducts.jsx"
import { RouterProtection } from "./components/RouterProtection/RoterProtection.jsx"
import { Checkout } from "./components/Checkout.jsx"
import HostOrders from "./components/HostOrder.jsx"
import MyOrders from "./components/UserOrder.jsx"
import { ForgotPassword } from "./components/ForgotPassword.jsx"
import HostAnalytics from "./components/HostAnalysis.jsx"
import { NewArrivals } from "./components/NewArrivals.jsx"
import { AboutPage } from "./components/AboutPage.jsx"
import CustomerSupport from "./components/CustomerSupport.jsx"
function App() {

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search/all-items",
          element: <SearchItems />
        },
        {
          path: "/all-items",
          element: <AllItems />
        },
        {
          path: "/login",
          element: <Loginpage />
        },
        {
          path: "/about",
          element: <AboutPage />
        },
        {
          path: "/customer/support",
          element: <CustomerSupport />
        },
        {
          path: "/signup",
          element: <Signuppage />
        },
        {
          path: "/profile",
          element: <RouterProtection allowedRoles={["user","host"]}><MainProfile /></RouterProtection>
        },
        {
          path: "/shop-items/:id",
          element: <RouterProtection><Shop /></RouterProtection>
        },
        {
          path: "/carts",
          element: <RouterProtection allowedRoles={["user","host"]}><Carts /></RouterProtection>
        },
        {
          path: "/carts/:id",
          element: <RouterProtection><Carts /></RouterProtection>
        },
        {
          path: "/host",
          element: <RouterProtection  allowedRoles={["host"]}><HostDashboard /></RouterProtection>
        },
        {
          path: "/myproducts",
          element: <RouterProtection allowedRoles={["host"]}><MyProducts /></RouterProtection>
        },
        {
          path: "/new/arrivals",
          element: <NewArrivals />
        }
        ,
        {
          path: "/host/edit/:id",
          element: <RouterProtection  allowedRoles={["host"]}><HostDashboard /></RouterProtection>
        },

        {
          path: "/checkout",
          element: <RouterProtection allowedRoles={["user","host"]}><Checkout/></RouterProtection>
        },
        {
          path: "/host/order",
          element: <RouterProtection  allowedRoles={["host"]}><HostOrders/></RouterProtection>
        },
        {
          path: "/user/myorders",
          element: <RouterProtection allowedRoles={["user","host"]}><MyOrders /></RouterProtection>
        },
        {
          path: "/auth/login/forgotpassword",
          element:<ForgotPassword/>
        },
        {
          path: "/host/products/analysis",
          element:<HostAnalytics/>
        }
      ]
    }
  ])
  return (
    <>
      <Provider store={ShopStore}>
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
