import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { useEffect } from "react";
import { MetaData } from "../Layouts/MetaData";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slice/cartSlice";
import { CheckOutSteps } from "./CheckOutSteps";
import { createOrder } from '../../action/orderAction';
import { clearOrderError } from "../../slice/orderSlice";


export const Payment = () => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items:cartItems, shippingInfo} = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState)
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping:{
            name: user.name,
            address:{
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice,
        order.shippingPrice = orderInfo.shippingPrice,
        order.taxPrice = orderInfo.taxPrice,
        order.totalPrice = orderInfo.totalPrice
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);

        if(orderError){
            toast(orderError, {
                type: 'error',
                theme: 'dark',
                position: 'top-center',
                onOpen: () => {dispatch(clearOrderError())}
            })
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const config = {
                withCredentials: true
            }
            const {data} = await axios.post(`http://localhost:4000/payment/process`, paymentData, config);
            const clientSecret = data.client_secret;
            const result = stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error) {
                toast((await result).error.message, {
                    type: 'error',
                    theme: 'dark',
                    position: 'top-center'
                })
                document.querySelector('#pay_btn').disabled = false;
            }  else {
                if((await result).paymentIntent.status === 'succeeded'){
                    toast('Payment Success..!', {
                        type: 'success',
                        position: 'top-center'
                    })

                    order.paymentInfo = {
                        id: (await result).paymentIntent.id,
                        status: (await result).paymentIntent.status
                    }

                    dispatch(orderCompleted());
                    dispatch(createOrder(order));
                    navigate('/order/success');
                } else {
                    toast('Please try again...', {
                        type: 'warning',
                        theme: 'dark',
                        position: 'top-center'
                    })
                }
            }

        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <>
        <div className="container">
        <MetaData title={'Payment'} />
        <CheckOutSteps shipping confirmOrder Payment />
            <div className="row d-flex justify-content-center align-items-center my-5">
                <div className="col-5 shadow-lg border rounded my-2 py-2 px-3">
                    <form onSubmit={handleSubmit} >
                        <h3 className="text-center pb-2">Card Info</h3>
                        <div className=" mb-2">
                            <label htmlFor="cnumber">Card Number</label>
                            <CardNumberElement type="text" className="form-control" id="cnumber" placeholder="Name" name='name' />
                        </div>
                        <div className=" mb-2">
                            <label htmlFor="cexipry">Card Exipry</label>
                            <CardExpiryElement type="email" className="form-control" id="cexipry" placeholder="Email" name='email'  />
                        </div>
                        <div className=" mb-2">
                            <label htmlFor="cvc">Card CVC</label>
                            <CardCvcElement type="password" className="form-control" id="cvc" placeholder="Password" name='password' />
                        </div>
                        
                        <div className="col-3 mx-auto my-2">
                            <button id="pay_btn" className="btn btn-primary text-center" type="submit">Pay-${orderInfo && orderInfo.totalPrice}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}