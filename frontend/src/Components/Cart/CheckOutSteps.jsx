import { Link } from "react-router-dom"

export const CheckOutSteps = ({ shipping, confirmOrder, payment }) => {
    return <>
        <nav className="d-flex justify-content-center mt-3" aria-label="breadcrumb">
            <ol className="nav bg-secondary p-2 rounded justify-content-center gap-3">
                <StepLink
                    to="/shipping"
                    active={shipping}
                    label="Shipping Info"
                />
                <span className="align-self-center text-white">›</span>
                <StepLink
                    to="/order/confirm"
                    active={confirmOrder}
                    label="Confirm Order"
                />
                <span className="align-self-center text-white">›</span>
                <StepLink
                    to="/order/payment"
                    active={payment}
                    label="Payment"
                />
            </ol>
        </nav>

    </>
}

const StepLink = ({ to, active, label }) => (
    <li className="nav-item">
        <Link
            to={to}
            className={`nav-link px-3 py-1 rounded text-decoration-none 
          ${active ? 'bg-light text-dark fw-semibold' : 'border text-dark'}`}
        >
            {label}
        </Link>
    </li>
);