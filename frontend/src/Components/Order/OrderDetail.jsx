import { useDispatch, useSelector } from "react-redux"
import { MetaData } from "../Layouts/MetaData"
import { useEffect } from "react";
import { getOrderDetail } from "../../action/orderAction";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../Layouts/Loading";


export const OrderDetail = () => {

    const { orderDetail={}, loading } = useSelector(state => state.orderState);
    const dispatch = useDispatch();
    const { id } = useParams();

    const { shippingInfo={}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0, paymentInfo={} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [])

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Order Detail'} />
            <div className="container">
                <h1 className="my-5">Order # {orderDetail._id}</h1>
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
        </>
    )
}