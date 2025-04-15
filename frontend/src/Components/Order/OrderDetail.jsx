import { useDispatch, useSelector } from "react-redux"
import { MetaData } from "../Layouts/MetaData"
import { useEffect } from "react";
import { getOrderDetail } from "../../action/orderAction";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../Layouts/Loading";


export const OrderDetail = () => {

    const { orderDetail = {}, loading } = useSelector(state => state.orderState);
    const dispatch = useDispatch();
    const { id } = useParams();

    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [])

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Order Detail'} />
            <div className="container my-5">
                <h1 className="text-center mb-5">Order # {orderDetail._id}</h1>

                <div className="px-md-5">

                    {/* Shipping Info */}
                    <div className="mb-4 border rounded p-4 shadow-sm">
                        <h4 className="mb-3">Shipping Info</h4>
                        <div className="ps-3">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
                            <p><strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country} - ${shippingInfo.postalCode}`}</p>
                            <p><strong>Amount:</strong> ${totalPrice}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mb-4 border rounded p-4 shadow-sm">
                        <h4 className="mb-3">Payment</h4>
                        <h5 className="ps-3" style={{ color: isPaid ? 'green' : 'red' }}>
                            {isPaid ? 'PAID' : 'NOT PAID'}
                        </h5>
                    </div>

                    {/* Order Status */}
                    <div className="mb-4 border rounded p-4 shadow-sm">
                        <h4 className="mb-3">Order Status</h4>
                        <h5 className="ps-3" style={{ color: orderStatus?.includes('Delivered') ? 'green' : 'red' }}>
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
                                    <Link to={`/${item.product}`} className="text-dark text-decoration-none h6">
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="col-6 col-md-3 mt-2 mt-md-0">
                                    <h6 className="mb-0">${item.price}</h6>
                                </div>
                                <div className="col-6 col-md-3 mt-2 mt-md-0">
                                    <h6 className="mb-0">{item.quantity} Piece(s)</h6>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </>
    )
}