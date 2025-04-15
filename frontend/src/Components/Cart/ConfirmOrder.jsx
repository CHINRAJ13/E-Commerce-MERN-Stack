import { useSelector } from "react-redux"
import { MetaData } from "../Layouts/MetaData";
import { useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useNavigate } from "react-router-dom";
import { CheckOutSteps } from "./CheckOutSteps";


export const ConfirmOrder = () => {

    const { items: cartItems, shippingInfo} = useSelector(state => state.cartState);
    const {user} = useSelector(state => state.authState);
    const navigate = useNavigate();

    let itemsPrice = Number(cartItems.reduce((acc, item) => (acc += item.price * item.quantity),0));
    const shippingPrice = itemsPrice >2000 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(taxPrice + itemsPrice + shippingPrice).toFixed(2);
    itemsPrice = itemsPrice.toFixed(2);
    taxPrice = taxPrice.toFixed(2);

    const paymentProcess = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data));
        navigate('/payment');
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
    },[])

    return (
        <>
        <MetaData title={'Confirm Order'} />
        <div className="container">
        <CheckOutSteps shipping confirmOrder />
        <div className="container my-3">

  {/* Shipping Info */}
  <div className="border rounded p-3 mb-4 shadow-sm">
    <h4 className="mb-3">Shipping Info</h4>
    <div className="ps-3">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
      <p><strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} - ${shippingInfo.postalCode}`}</p>
    </div>
  </div>

  {/* Cart Items */}
  <div className="border rounded p-3 mb-4 shadow-sm">
    <h4 className="mb-3">Cart Items</h4>
    {cartItems.map((item) => (
      <div key={item.product} className="row align-items-center mb-3">
        <div className="col-4 col-md-2">
          <img src={item.image} alt={item.name} className="img-fluid rounded" />
        </div>
        <div className="col-8 col-md-6">
          <h6 className="mb-0">{item.name}</h6>
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0 text-md-end">
          <strong>{item.quantity} x ${item.price} = ${item.quantity * item.price}</strong>
        </div>
      </div>
    ))}
  </div>

  {/* Order Summary */}
  <div className="border rounded p-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
    <h4 className="mb-3">Order Summary</h4>
    <div className="d-flex justify-content-between mb-2">
      <span><strong>Subtotal:</strong></span>
      <span>${itemsPrice}</span>
    </div>
    <div className="d-flex justify-content-between mb-2">
      <span><strong>Shipping:</strong></span>
      <span>${shippingPrice}</span>
    </div>
    <div className="d-flex justify-content-between mb-2">
      <span><strong>Tax:</strong></span>
      <span>${taxPrice}</span>
    </div>
    <hr />
    <div className="d-flex justify-content-between mb-3">
      <span><strong>Total:</strong></span>
      <span><strong>${totalPrice}</strong></span>
    </div>
    <div className="text-center">
      <button className="btn btn-primary w-100" onClick={paymentProcess}>
        Proceed to Payment
      </button>
    </div>
  </div>

</div>

    </div>
        </>
    )
}