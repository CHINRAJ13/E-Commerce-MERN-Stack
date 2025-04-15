import { useEffect } from "react";
import { Sidebar } from "./SideBar"
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from "../../action/productAction";
import { getAdminOrders } from "../../action/orderAction";
import { getUsers } from "../../action/userAction";
import { Link } from "react-router-dom";
import { MetaData } from "../Layouts/MetaData";



export const Dashboard = () => {

    const { products = [] } = useSelector(state => state.productsState);
    const {adminOrders=[]} = useSelector(state => state.orderState);
    const {users=[]} = useSelector(state => state.userState);
    const dispatch = useDispatch();

    let outOfStocks = 0;
    let totalAmount;

    if(products.length > 0) {
        products.forEach(product => {
            if(product.stock ===0 ) {
                outOfStocks+=1;
            }
        })
    }

    if(adminOrders.length > 0) {
        totalAmount = adminOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    }

    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getAdminOrders);
        dispatch(getUsers)
    },[])

    return (
        <>
        <MetaData title={`Admin Dashboard`} />
        <div className="row">
    <div className="col-12 col-md-2">
        <Sidebar />
    </div>
    <div className="col-12 col-md-10">
        <h3 className="mt-3 mb-4">Dashboard</h3>

        <div className="row mb-4">
            <div className="col-12 bg-primary text-white rounded p-4 shadow-sm">
                <h5 className="text-center">Total Revenue</h5>
                <h4 className="text-center">$ {totalAmount}</h4>
            </div>
        </div>

        <div className="row g-4">
            <div className="col-12 col-md-3">
                <div className="bg-warning text-dark rounded p-3 text-center shadow-sm">
                    <h5>Products</h5>
                    <h6>{products.length}</h6>
                    <hr />
                    <Link to="/admin/allproducts" className="btn btn-outline-dark btn-sm">View Details</Link>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="bg-danger text-white rounded p-3 text-center shadow-sm">
                    <h5>Orders</h5>
                    <h6>{adminOrders.length}</h6>
                    <hr />
                    <Link to="/admin/orders" className="btn btn-outline-light btn-sm">View Details</Link>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="bg-success text-white rounded p-3 text-center shadow-sm">
                    <h5>Users</h5>
                    <h6>{users.length}</h6>
                    <hr />
                    <Link to="/admin/users" className="btn btn-outline-light btn-sm">View Details</Link>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="bg-primary text-white rounded p-3 text-center shadow-sm">
                    <h5>Out of Stock</h5>
                    <h6>{outOfStocks}</h6>
                </div>
            </div>
        </div>
    </div>
</div>

        </>
    )
}