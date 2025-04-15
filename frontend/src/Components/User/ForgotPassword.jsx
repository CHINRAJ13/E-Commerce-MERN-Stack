import { useEffect, useState } from "react";
import { MetaData } from "../Layouts/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword } from "../../action/userAction";
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'


export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.authState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {

        if (message) {
            toast(`${message.message}`, {
                position: "top-center",
                type: 'success'
            });
            setEmail('');
            return
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
    }, [message, error, dispatch])

    return (
        <>
            <MetaData title={'Login Page'} />

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4">FORGOT PASSWORD</h5>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="d-grid my-4">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Mail'}
                                </button>
                            </div>

                            <p className="text-center mb-0">
                                Remember your password? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}