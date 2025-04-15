import { useEffect, useState } from "react";
import { MetaData } from "../Layouts/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../action/userAction";
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Axios from "axios";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const location = useLocation();



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
            // return toast.success(`Logged in Successfully`, {
            //     position: "top-center"
            // }); 
        }

        if (error) {
            toast.error(error, {
                toastId: "loginError",
                position: "top-center",
                theme: 'dark',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [isAuthenticated, error, dispatch])

    return (
        <>
            <MetaData title={'Login Page'} />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4">LOG IN</h5>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <div className="text-end mt-1">
                                    <Link to="/password/forgot" className="small">Forgot Password?</Link>
                                </div>
                            </div>

                            <div className="d-grid my-4">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>

                            <p className="text-center mb-0">
                                New user? <Link to="/register">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            

        </>
    )
}