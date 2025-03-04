import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { decreaseCartItemQty, increaseCartItemQty, removeCartItem } from '../../slice/cartSlice';
import { MetaData } from '../Layouts/MetaData';

export const Cart = () => {

    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if(item.stock == 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    }

    const decreaseQty = (item) => {
        const count = item.quantity;
        if(count == 1) return;
        dispatch(decreaseCartItemQty(item.product));
    }

    const handleCheckOut = () => {
        navigate(`/login?redirect=shipping`);
    }
    

    return (
        <>
            {items.length == 0 ? <h3 className='text-center my-5'>Your Cart has Empty</h3> : (
                <div className="container my-2">
                    <MetaData title={'Cart'} />
                    <h3 className="my-2">Your Cart: <b>{items.length}  items</b></h3>
                    <div className="row">
                        {items.map((item) => {
                            return <div className="col-12 my-2" key={item.product} >
                                <div className="row border rounded p-2">
                                    <div className="col-md-3 col-6 mt-2">
                                        <img src={item.image} alt={item.name} className="d-block w-100" />
                                    </div>
                                    <div className="col-md-3 col-6 mt-2">
                                        <NavLink to={`/${item.product}`} className="text-decoration-none d-block text-dark"><p><b>{item.name} </b></p></NavLink>
                                        <p>With no Cost </p>
                                        <p>EMI / Additional </p>
                                        <p>Exchange Offers </p>
                                    </div>
                                    <div className="col-md-2 col-6 mt-2"><h4>$ {item.price} </h4></div>
                                    <div className="col-md-2 col-6 mt-2">
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-danger text-light" onClick={() => decreaseQty(item)}><b>-</b></button>
                                            <input type="number" className="form-control count d-inline " style={{ width: '60px' }} value={item.quantity} readOnly />
                                            <button className="btn btn-primary  text-light" onClick={() => increaseQty(item)}><b>+</b></button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-6 text-center">
                                        <button className="btn btn-secondary mt-2" onClick={()=>dispatch(removeCartItem(item.product))}><i className="bi bi-trash3-fill"></i></button>
                                    </div>


                                </div>
                            </div>
                        })}

                    </div>
                    <div className=" mt-2 d-flex justify-content-evenly ">
                        <div className="d-flex flex-column p-3 border rounded">

                            <h2 className="text-center">Order Summary</h2>
                            <hr />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Subtotal :</td>
                                        <td><b>{items.reduce((acc, item) => (acc + item.quantity), 0)} (units)</b></td>
                                    </tr>
                                    <tr>
                                        <td>Est. total :</td>
                                        <td><b>$ {Number(items.reduce((acc, item) => (acc + item.quantity * item.price), 0)).toFixed(2)}</b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="text-center"><button className="btn btn-warning" onClick={handleCheckOut} >Check Out</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}