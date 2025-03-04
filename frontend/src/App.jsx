import { Home } from "./Components/Home";
import { Footer } from "./Components/Layouts/Footer";
import { Header } from "./Components/Layouts/Header";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { ProductDetail } from "./Components/Product/ProductDetail";
import { ProductSearch } from "./Components/Product/ProductSearch";
import { Login } from "./Components/User/Login";
import { Register } from "./Components/User/Register";
import { useEffect, useState } from "react";
import store from './store'
import { loadUser } from "./action/userAction";
import { Profile } from "./Components/User/Profile";
import { ProtectedRoute } from "./Components/route/ProtectedRoute";
import { UpdateProfile } from "./Components/User/UpdateProfile";
import { UpdatePassword } from "./Components/User/UpdatePassword";
import { ForgotPassword } from "./Components/User/ForgotPassword";
import { ResetPassword } from "./Components/User/ResetPassword";
import { Cart } from "./Components/Cart/Cart";
import { Shipping } from "./Components/Cart/Shipping";
import { ConfirmOrder } from "./Components/Cart/ConfirmOrder";
import { Payment } from "./Components/Cart/Payment";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSuccess } from "./Components/Cart/OrderSuccess";
import { UserOrder } from "./Components/Order/UserOrder";
import { OrderDetail } from "./Components/Order/OrderDetail";
import { Dashboard } from "./Components/Admin/Dashboard";
import { ProductList } from "./Components/Admin/ProductList";
import { NewProduct } from "./Components/Admin/NewProduct";
import { UpdateProduct } from "./Components/Admin/UpdateProduct";
import { OrderList } from "./Components/Admin/OrderList";
import { UpdateOrder } from "./Components/Admin/UpdateOrder";
import { UserList } from "./Components/Admin/UserList";
import { UpdateUser } from "./Components/Admin/UpdateUser";
import { ReviewList } from "./Components/Admin/ReviewList";


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const config = {
        withCredentials: true
    }
      const {data} = await axios.get(`http://localhost:4000/payment/stripeapi`,config);
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  },[])

  return (
    <>
      <Router>
        <HelmetProvider >
          <Header />
          <div className="container">
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/:id" element={<ProductDetail />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path="/password/change" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              {stripeApiKey && <Route path="/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />}
              <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><UserOrder /></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            </Routes>
          </div>
          <Routes>
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} /> 
            <Route path="/admin/allproducts" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} /> 
            <Route path="/admin/product/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} /> 
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} /> 
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} /> 
            <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} /> 
            <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} /> 
            <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} /> 
            <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ReviewList /></ProtectedRoute>} /> 
          </Routes>
          <Footer />
        </HelmetProvider>
      </Router>
    </>
  )
}

export default App
