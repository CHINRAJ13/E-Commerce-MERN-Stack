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
            {items.length === 0 ? (
  <h3 className="text-center my-5">Your Cart is Empty</h3>
) : (
  <div className="container my-4">
    <MetaData title={'Cart'} />
    <h3 className="mb-4">Shopping Cart <span className="text-muted">({items.length} items)</span></h3>

    <div className="row">
      {/* LEFT: Cart Items */}
      <div className="col-md-8">
        {items.map((item) => (
          <div className="card mb-3" key={item.product}>
            <div className="row g-0 align-items-center">
              {/* Product Image */}
              <div className="col-md-3 text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded-start p-2"
                />
              </div>

              {/* Product Info */}
              <div className="col-md-5">
                <div className="card-body">
                  <NavLink to={`/${item.product}`} className="text-decoration-none text-dark">
                    <h5 className="card-title">{item.name}</h5>
                  </NavLink>
                  <p className="card-text small text-muted">With No Cost EMI / Exchange Offers</p>
                  <h6 className="text-primary">$ {item.price.toFixed(2)}</h6>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="col-md-2 text-center">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={item.quantity <= 1}
                    onClick={() => decreaseQty(item)}
                  >-</button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={item.quantity}
                    readOnly
                    style={{ width: '50px' }}
                  />
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => increaseQty(item)}
                  >+</button>
                </div>
              </div>

              {/* Delete Button */}
              <div className="col-md-2 text-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => dispatch(removeCartItem(item.product))}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Order Summary */}
      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <h4 className="text-center">Order Summary</h4>
          <hr />
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td className="text-end">
                  {items.reduce((acc, item) => acc + item.quantity, 0)} units
                </td>
              </tr>
              <tr>
                <td>Estimated Total:</td>
                <td className="text-end text-success">
                  <b>$ {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-grid mt-3">
            <button className="btn btn-warning btn-lg" onClick={handleCheckOut}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </>
    )
}