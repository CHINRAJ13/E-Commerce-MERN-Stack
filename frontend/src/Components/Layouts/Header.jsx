import { useNavigate } from "react-router-dom"
import { Search } from "./Search"
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { logout } from "../../action/userAction";


export const Header =() => {

    const { isAuthenticated, user} = useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout);
    }

    return (
        <header className="bg-primary py-1">
            <nav className="d-flex justify-content-around align-items-center px-4">
                <div className=""  onClick={() => navigate('/')}>
                    <img src="/RajCart_logo.png" alt="MC Cart" className="rounded" height={50} />
                </div>
                <Search />
                <div className="d-flex align-items-center gap-2">
                    {isAuthenticated ? (
                        <Dropdown className="d-inline" style={{paddingTop: '0'}}>
                            <Dropdown.Toggle className="d-flex align-items-center gap-2" variant="default text-light" id="dropdown-basic">
                                <figure className="d-flex">
                                    <Image src={user.avatar} alt="Avatar" className="mt-3" style={{borderRadius: '50%'}} width={40} height={40} />
                                </figure>
                                <span>{user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.role === 'admin' && <Dropdown.Item className="text-dark" onClick={() => navigate('admin/dashboard')}>Dashboard</Dropdown.Item> }
                                <Dropdown.Item className="text-dark" onClick={() => navigate('/myprofile')}>Profile</Dropdown.Item>
                                <Dropdown.Item className="text-dark" onClick={() => navigate('/orders')}>Orders</Dropdown.Item>
                                <Dropdown.Item className="text-danger" onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <button className="btn btn-warning" onClick={() => navigate('/login')}>Login</button>
                    )}
                    <div className="text-light" style={{cursor: 'pointer'}} onClick={() => navigate('/cart')}>Cart 
                        <span className="bg-warning text-dark px-2 mx-2 py-1 rounded">{cartItems.length}</span>
                        </div>
                </div>
            </nav>
        </header>
    )
}