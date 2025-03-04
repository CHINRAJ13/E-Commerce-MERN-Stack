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
        <div className="shipInfo my-2">
            <h4>Shipping Info</h4>
            <div className="ms-5">
                <p><b>Name: </b>{user.name}</p>
                <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
                <p><b>Address: </b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.postalCode}</p>
            </div>
        </div>
        <hr />

        <div className="cartItem my-2">
            {cartItems.map(item => <div key={item.product} className="row">
                <div className="col-6 col-md-4">
                    <img src={item.image} alt="Product" className="d-block w-50" />
                </div>
                <div className="col-6 col-md-4">
                    <h5 >{item.name}</h5>
                </div>
                <div className="col-6 col-md-4">
                    <h5>{item.quantity} x {item.price} = $ {item.quantity * item.price}</h5>
                </div>
            </div>)}
            
        </div>
        <hr />

        <div className="orderSummary border rounded w-50 p-3 my-3">
            
            <h4>Order Summary</h4>
            <hr />
            <div className="mx-4">
                <span className="float-start"><b>Subtotal: &nbsp;&nbsp;</b></span><span className="float-end"> $ {itemsPrice}</span><br />
                <span className="float-start"><b>Shipping: &nbsp;&nbsp;</b></span><span className="float-end">$ {shippingPrice}</span><br />
                <span className="float-start"><b>Tax: &nbsp;&nbsp;</b></span><span className="float-end">$ {taxPrice}</span><br />
                <hr />
                <span className="float-start"><b>Total: &nbsp;&nbsp;</b></span><span className=" float-end">$ {totalPrice}</span><br />
                <hr />
                <button className="btn btn-primary text-center" onClick={paymentProcess} >Procced to Payment</button>
            </div>
        </div>
    </div>
        </>
    )
}