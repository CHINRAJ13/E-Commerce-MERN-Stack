import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavDropdown } from 'react-bootstrap';



export const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <nav className="bg-primary vh-100 p-3" style={{ width: "170px" }}>
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item">
                            <Link to={`/admin/dashboard`}  href="#" className="h4 text-light d-block" style={{ textDecoration: "none" }}>
                                <i className="fa-solid fa-home me-2"></i>Dashboard
                            </Link>
                        </li>

                        {/* <li className="nav-item">
                            <NavDropdown title={<><i className=''></i>Product</>}>
                                <NavDropdown.Item onClick={() => navigate('/admin/products')} ><i className=''></i>All</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/admin/products/create')} ><i className=''></i>Create</NavDropdown.Item>
                            </NavDropdown>
                        </li> */}

                        {/* Products Dropdown */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="text-light dropdown-toggle d-block"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ textDecoration: "none" }}
                            >
                                <i className="bi bi-bag-check-fill me-2"></i>Products
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to={`/admin/allproducts`} className="dropdown-item" href="#"><i className="bi bi-bag-check-fill me-2"></i>All</Link></li>
                                <li><Link to={`/admin/product/create`}  className="dropdown-item" href="#"><i className="bi bi-bag-plus-fill me-2"></i>Create</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to={`/admin/users`}  className="text-light d-block" style={{ textDecoration: "none" }}>
                                <i className="bi bi-people-fill me-2"></i>Users
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={`/admin/orders`}  className="text-light d-block" style={{ textDecoration: "none" }}>
                                <i className="bi bi-cart-check-fill me-2"></i>Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/reviews`}  className="text-light d-block" style={{ textDecoration: "none" }}>
                                <i className="bi bi-chat-dots-fill me-2"></i>Reviews
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div >
        </>
    )
}