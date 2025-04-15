import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { clearAuthError, resetPassword } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";



export const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token));
    }

    useEffect(() => {
        if (isAuthenticated) {
            toast(`Password has Changed successfully`, {
                position: "top-center",
                type: 'success'
            });
            navigate('/');
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
    }, [isAuthenticated, error, dispatch, navigate])

    return (
        <>
            <MetaData title={'Reset Password'} />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4">RESET PASSWORD</h5>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="pass"
                                    placeholder="Password"
                                    name="pass"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="pass">New Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="cpass"
                                    placeholder="Confirm Password"
                                    name="cpass"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="cpass">Confirm Password</label>
                            </div>

                            <div className="d-grid my-4">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Setting...' : 'Set Password'}
                                </button>
                            </div>

                            <p className="text-center mb-0">
                                Back to <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}