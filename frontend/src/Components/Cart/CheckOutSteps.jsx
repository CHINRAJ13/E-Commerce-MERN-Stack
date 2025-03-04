import { Link } from "react-router-dom"

export const CheckOutSteps = ({shipping, confirmOrder, payment}) => {
    return <>
        <nav className="d-flex justify-content-center mt-3" aria-label="breadcrumb">
            <ol className="nav d-flex justify-content-evenly text-center gap-3 bg-secondary p-2 rounded">

                {shipping ?
                    <Link to={'/shipping'} className="text-decoration-none text-dark">
                        <li className="nav-item bg-light px-1 rounded">Shipping Info</li> 
                    </Link>:
                    <Link to={'/shipping'} className="text-decoration-none border rounded text-dark">
                        <li className="nav-item  px-1 rounded">Shipping Info</li>
                    </Link>}{ '>'}

                    {confirmOrder ?
                    <Link to={'/order/confirm'} className="text-decoration-none text-dark">
                         <li className="nav-item bg-light px-1 rounded">Confirm Order</li> 
                    </Link>:
                    <Link to={'/order/confirm'} className="text-decoration-none border rounded text-dark">
                         <li className="nav-item px-1 rounded">Confirm Order</li>
                    </Link>}{ '>'}
                        
                    {payment ?
                    <Link to={'/order/confirm'} className="text-decoration-none text-dark">
                         <li className="nav-item bg-light px-1 rounded">Payment</li> 
                    </Link>:
                    <Link to={'/order/confirm'} className="text-decoration-none border rounded text-dark">
                         <li className="nav-item px-1 rounded">Payment</li>
                    </Link>}
            </ol>
        </nav>
    </>
}