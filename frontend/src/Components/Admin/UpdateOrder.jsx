import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { Sidebar } from "./SideBar"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderDetail, updateOrder } from "../../action/orderAction";
import { clearOrderError, clearOrderUpdated } from "../../slice/orderSlice";
import { Loading } from "../Layouts/Loading";



export const UpdateOrder = () => {


    const { loading, isOrderUpdated, error, orderDetails } = useSelector(state => state.orderState);
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetails;
    const isPaid = paymentInfo.status === 'succeeded' ? true : false;
    const [orderStatus, setOrderStatus] = useState('Processing');


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    // const status = []

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(id, orderData));
    }


    useEffect(() => {
        if (isOrderUpdated) {
            toast(`Order has updated Successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearOrderUpdated())
            })
            // navigate('')
            return;
        }

        if (error) {
            toast(`${error.error}`, {
                type: 'error',
                position: 'top-center',
                theme: 'dark',
                onOpen: () => dispatch(clearOrderError())
            })
        }

        dispatch(getOrderDetail(id));

    }, [isOrderUpdated, error, dispatch, navigate, id])

    useEffect(() => {
        if (orderDetails._id) {
            setOrderStatus(orderDetails.orderStatus)
        }
    }, [orderDetails])


    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Update Order'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {/* <h3>Product List</h3> */}
                    <div className="container my-5">
                        <h1 className="mb-5 text-center">Order # {orderDetails._id}</h1>

                        <div className="row">
                            {/* Left Section: Order Details */}
                            <div className="col-md-9">
                                <div className="px-md-5">

                                    {/* Shipping Info */}
                                    <div className="mb-4 border rounded p-4 shadow-sm">
                                        <h4 className="mb-3">Shipping Info</h4>
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
                                        <p><strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country} - ${shippingInfo.postalCode}`}</p>
                                        <p><strong>Amount:</strong> ${totalPrice}</p>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="mb-4 border rounded p-4 shadow-sm">
                                        <h4 className="mb-3">Payment</h4>
                                        <h5 className="ps-2" style={{ color: isPaid ? 'green' : 'red' }}>
                                            {isPaid ? 'PAID' : 'NOT PAID'}
                                        </h5>
                                    </div>

                                    {/* Order Status Display */}
                                    <div className="mb-4 border rounded p-4 shadow-sm">
                                        <h4 className="mb-3">Order Status</h4>
                                        <h5 className="ps-2" style={{ color: orderStatus?.includes('Delivered') ? 'green' : 'red' }}>
                                            {orderStatus}
                                        </h5>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-4 border rounded p-4 shadow-sm">
                                        <h4 className="mb-4">Order Items</h4>
                                        {orderItems?.map(item => (
                                            <div key={item._id} className="row align-items-center mb-3">
                                                <div className="col-6 col-md-2">
                                                    <img src={item.image} alt={item.name} className="img-fluid rounded" />
                                                </div>
                                                <div className="col-6 col-md-4">
                                                    <Link to={`/${item.product}`} className="text-dark text-decoration-none h6 d-block">
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div className="col-6 col-md-3 mt-2 mt-md-0">
                                                    <h6>${item.price}</h6>
                                                </div>
                                                <div className="col-6 col-md-3 mt-2 mt-md-0">
                                                    <h6>{item.quantity} Piece(s)</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section: Admin Order Update */}
                            <div className="col-md-3">
                                <div className="border rounded p-4 shadow-sm">
                                    <h4 className="mb-3">Update Order Status</h4>
                                    <div className="form-group mb-3">
                                        <label htmlFor="orderStatusSelect" className="form-label">Status</label>
                                        <select
                                            id="orderStatusSelect"
                                            className="form-control"
                                            onChange={e => setOrderStatus(e.target.value)}
                                            value={orderStatus}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}