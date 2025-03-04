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
                    <div className="container">
                        <h1 className="my-5">Order # {orderDetails._id}</h1>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="container mx-5">

                                    {/* Shipping Info */}
                                    <div className="shipInfo my-2">
                                        <h3>Shipping Info</h3>
                                        <div className="ms-5 my-3">
                                            <p><b>Name: </b>{user.name}</p>
                                            <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
                                            <p><b>Address: </b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country} - {shippingInfo.postalCode}</p>
                                            <p><b>Amount: </b>{totalPrice}</p>
                                        </div>
                                    </div>
                                    <hr />

                                    {/* Payment */}
                                    <div className="payment">
                                        <h3>Payment</h3>
                                        <h4 className="ps-5 my-3" style={isPaid ? { color: 'green' } : { color: 'red' }}>{isPaid ? 'PAID' : 'NOT PAID'}</h4>
                                    </div>
                                    <hr />

                                    {/* Order Status */}
                                    <div className="orderStatus">
                                        <h3>Order Status</h3>
                                        <h4 className="ps-5 my-3" style={orderStatus && orderStatus.includes('Delivered') ? { color: 'green' } : { color: 'red' }}>{orderStatus}</h4>
                                    </div>
                                    <hr />

                                    {/* Order Items */}
                                    <div className="cartItem my-2">
                                        <h3>Order Items</h3>
                                        {orderItems && orderItems.map(item => (
                                            <div key={item._id} className="row my-3">
                                                <div className="col-6 col-md-3">
                                                    <img src={item.image} alt={item.image} className="d-block w-50" />
                                                </div>
                                                <div className="col-6 col-md-3">
                                                    <Link to={`/${item.product}`} className="h5 text-decoration-none d-block text-dark">{item.name}</Link>
                                                </div>
                                                <div className="col-6 col-md-3">
                                                    <h5> ${item.price} </h5>
                                                </div>
                                                <div className="col-6 col-md-3">
                                                    <h5> {item.quantity} Piece(s) </h5>
                                                </div>
                                            </div>
                                        )

                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                {/* Order Status */}
                                <div className="orderStatus">
                                    <h3>Order Status</h3>
                                    <div className="form-group">
                                        <select className="form-control" onChange={e => setOrderStatus(e.target.value)} value={orderStatus}>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary btn-block mt-3" disabled={loading} onClick={handleSubmit}>Update Order</button>
                                    {/* <h4 className="ps-5 my-3" style={orderStatus && orderStatus.includes('Delivered') ? { color: 'green' } : { color: 'red' }}>{orderStatus}</h4> */}
                                </div>
                                <hr />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}