import { useEffect, useState } from "react";
import { MetaData } from "../Layouts/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../action/userAction";
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const location = useLocation();


    Axios.defaults.withCredentials = true;
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
            toast(`${error}`, {
                position: "top-center",
                theme: 'dark',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [isAuthenticated, error, dispatch])

    return (
        <>
            <MetaData title={'Login Page'} />
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">LOG IN</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="password">Password</label>
                                <Link to={"/password/forgot"} className="float-end">Forgot Password?</Link>
                            </div>
                            <br />
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" disabled={loading}>Login</button>
                            </div>
                            <p className="text-center">New user? <Link to={"/register"}>Register</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}