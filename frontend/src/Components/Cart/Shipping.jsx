import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { countries } from "countries-list"
import { MetaData } from "../Layouts/MetaData";
import { saveShippingInfo } from "../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckOutSteps } from "./CheckOutSteps";


export const validateShipping = (shippingInfo, navigate) => {
    if(
        !shippingInfo.city ||
        !shippingInfo.address ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode ||
        !shippingInfo.country ||
        !shippingInfo.state
    ){
        toast('Please enter the Shipping Information', {
            type: 'error',
            theme: 'dark',
            position: 'top-center'
        });
        navigate('/shipping');
    }
}


export const Shipping = () => {

    const { shippingInfo={} } = useSelector(state => state.cartState);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countryList = Object.values(countries);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country, state}));
        navigate('/order/confirm');
    }

    return (
        <>
        <div className="container">
            <MetaData title={`Shipping Info`} />
            <CheckOutSteps shipping />
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-5 shadow-lg border rounded my-2 py-2 px-3">
                    <form onSubmit={handleSubmit} >
                        <h3 className="text-center pb-2">Shipping Info</h3>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="address" placeholder="Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="city" placeholder="City" name='city' value={city} onChange={(e) => setCity(e.target.value)} />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="phoneNo" placeholder="phoneNo" name='phoneNo' value={phoneNo} onChange={(e) => setphoneNo(e.target.value)} />
                            <label htmlFor="phoneNo">Phone No</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="number" className="form-control" id="code" placeholder="Postal Code" name='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            <label htmlFor="code">Postal Code</label>
                        </div>
                        <div className="form-floating mb-2"> 
                            <select className="form-select" id="country" name='country' value={country} onChange={(e) => setCountry(e.target.value)} >
                               {countryList.map((country,i) => (
                                <option key={i} value={country.name}>{country.name}</option>
                               ))} 
                                
                            </select>
                            <label htmlFor="country">Country</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="state" placeholder="State" name='state' value={state} onChange={(e) => setState(e.target.value)} />
                            <label htmlFor="state">State</label>
                        </div>
                      
                        <div className="d-grid col-3 mx-auto my-2">
                            <button className="btn btn-primary text-center" type="submit">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}