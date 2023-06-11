import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/home/Home'
import Cart from '../pages/cart/Cart'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Payment from '../pages/Payment'
import ProductsManagement from '../pages/admin/ProductsManagement'
import { Management } from '../pages/admin/Management'
import AdminLogin from '../pages/admin/AdminLogin'

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/cart',
        element: <Cart/>
    },
    {
        path: '/product-details',
        element: <ProductDetails/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    }, 
    {
        path: '/payment',
        element: <Payment/>
    }, 
    {
        path: '/admin-management',
        element: <Management/>
    }, 
    {
        path: '/admin-products-management',
        element: <ProductsManagement/>
    }, 
    {
        path: '/admin-login',
        element: <AdminLogin/>
    }
])

export default routers