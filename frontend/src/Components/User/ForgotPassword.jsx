import { useEffect, useState } from "react";
import { MetaData } from "../Layouts/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword } from "../../action/userAction";
import { toast } from 'react-toastify'


export const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading, error, message } = useSelector(state => state.authState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {

        if(message){
            toast(`${message.message}`, {
                position: "top-center",
                type: 'success'
            });
            setEmail('');
            return
        }

        if(error){
            toast(`${error}`, {
                position: "top-center",
                theme: 'dark',
                type: 'error',
                onOpen: () => {dispatch(clearAuthError)}
            });
            return
        }
    },[ message, error, dispatch])

    return (
        <>
            <MetaData title={'Login Page'} />
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">FORGOT PASSWORD</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" disabled={loading}>Send Mail</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}