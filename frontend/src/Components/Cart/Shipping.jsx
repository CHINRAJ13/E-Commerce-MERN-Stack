import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { countries } from "countries-list"
import { MetaData } from "../Layouts/MetaData";
import { saveShippingInfo } from "../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckOutSteps } from "./CheckOutSteps";


export const validateShipping = (shippingInfo, navigate) => {
    if (
        !shippingInfo.city ||
        !shippingInfo.address ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode ||
        !shippingInfo.country ||
        !shippingInfo.state
    ) {
        toast('Please enter the Shipping Information', {
            type: 'error',
            theme: 'dark',
            position: 'top-center'
        });
        navigate('/shipping');
    }
}


export const Shipping = () => {

    const { shippingInfo = {} } = useSelector(state => state.cartState);

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
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate('/order/confirm');
    }

    return (
        <>
            <div className="container">
                <MetaData title={`Shipping Info`} />
                <CheckOutSteps shipping />
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">
                                    <h3 className="text-center mb-4">Shipping Info</h3>

                                    <form onSubmit={handleSubmit}>
                                        {/* Address */}
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                placeholder="Address"
                                                name="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="address">Address</label>
                                        </div>

                                        {/* City */}
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                placeholder="City"
                                                name="city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="city">City</label>
                                        </div>

                                        {/* Phone No */}
                                        <div className="form-floating mb-3">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phoneNo"
                                                placeholder="Phone Number"
                                                name="phoneNo"
                                                value={phoneNo}
                                                onChange={(e) => setphoneNo(e.target.value)}
                                                pattern="[0-9]{10}"
                                                required
                                            />
                                            <label htmlFor="phoneNo">Phone No</label>
                                        </div>

                                        {/* Postal Code */}
                                        <div className="form-floating mb-3">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="postalCode"
                                                placeholder="Postal Code"
                                                name="postalCode"
                                                value={postalCode}
                                                onChange={(e) => setPostalCode(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="postalCode">Postal Code</label>
                                        </div>

                                        {/* Country */}
                                        <div className="form-floating mb-3">
                                            <select
                                                className="form-select"
                                                id="country"
                                                name="country"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select your country</option>
                                                {countryList.map((country, i) => (
                                                    <option key={i} value={country.name}>{country.name}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="country">Country</label>
                                        </div>

                                        {/* State */}
                                        <div className="form-floating mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="state"
                                                placeholder="State"
                                                name="state"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="state">State</label>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-lg" type="submit">
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}