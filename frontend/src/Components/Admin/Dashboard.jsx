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
                    <h3>Dashboard</h3>
                    <div className="row m-3">
                        <div className="col-12 bg-primary rounded p-3">
                            <h5 className="text-center">Total Price</h5>
                            <h6 className="text-center">$ {totalAmount}</h6>
                        </div>
                    </div>

                    <div className="row m-3 justify-content-between">
                        <div className="col-12 col-md-2 bg-warning rounded py-2">
                            <h5 className="text-center">Products</h5>
                            <h6 className="text-center">{products.length}</h6>
                            <hr />
                            <Link to={`/admin/allproducts`} className="btn">View Details</Link>
                        </div>
                        <div className="col-12 col-md-2 bg-danger rounded py-2">
                            <h5 className="text-center">Orders</h5>
                            <h6 className="text-center">{adminOrders.length}</h6>
                            <hr />
                            <Link to={`/admin/orders`} className="btn">View Details</Link>
                        </div>
                        <div className="col-12 col-md-2 bg-success rounded py-2">
                            <h5 className="text-center">Users</h5>
                            <h6 className="text-center">{users.length}</h6>
                            <hr />
                            <Link to={`/admin/users`} className="btn">View Details</Link>
                        </div>
                        <div className="col-12 col-md-2 bg-primary rounded py-2">
                            <h5 className="text-center">Out Of Stock</h5>
                            <h6 className="text-center">{outOfStocks}</h6>
                            {/* <hr /> */}
                            {/* <Link className="btn">View Details</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}