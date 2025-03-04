import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { clearAuthError, resetPassword } from "../../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">RESET PASSWORD</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="pass" placeholder="password" name="pass" onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="pass">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="cpass" placeholder="Password" name="cpass" onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label htmlFor="cpass">Confirm Password</label>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" disabled={loading}>Set Password</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}