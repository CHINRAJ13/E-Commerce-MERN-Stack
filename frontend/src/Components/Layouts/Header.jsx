import { useNavigate } from "react-router-dom"
import { Search } from "./Search"
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { logout } from "../../action/userAction";


export const Header = () => {

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout);
    }

    return (
        <header className="bg-primary py-2 shadow-sm sticky-top">
            <nav className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src="/RajCart_logo.png" alt="RajCart" className="rounded" height={50} />
                </div>

                {/* Search Bar */}
                <div>
                    <Search />
                </div>

                {/* User & Cart */}
                <div className="d-flex align-items-center gap-3">
                    {isAuthenticated ? (
                        <Dropdown align="end">
                            <Dropdown.Toggle
                                className="d-flex align-items-center gap-2 bg-transparent border-0 text-white"
                                id="dropdown-user"
                            >
                                <figure className="mb-0">
                                    <Image
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="border border-light"
                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        width={40}
                                        height={40}
                                    />
                                </figure>
                                <span className="fw-semibold">{user.name}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {user.role === 'admin' && (
                                    <Dropdown.Item onClick={() => navigate('/admin/dashboard')}>
                                        Dashboard
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Item onClick={() => navigate('/myprofile')}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/orders')}>Orders</Dropdown.Item>
                                <Dropdown.Item className="text-danger" onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <button className="btn btn-warning px-3 fw-semibold" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    )}

                    {/* Cart */}
                    <div
                        className="text-white position-relative fw-semibold"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/cart')}
                    >
                        Cart
                        <span className="badge bg-warning text-dark ms-2">
                            {cartItems.length}
                        </span>
                    </div>
                </div>
            </nav>
        </header>

    )
}