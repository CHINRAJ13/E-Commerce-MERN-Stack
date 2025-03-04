import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../Layouts/MetaData";
import { useEffect, useState } from "react";
import { clearAuthError, updatePassword } from "../../action/userAction";
import { toast } from "react-toastify";

export const UpdatePassword = () => {

    const { isUpdated, error } = useSelector(state => state.authState);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('oldPassword', oldPassword);
        dispatch(updatePassword(formData));
    }

    useEffect(() => {

        if (isUpdated) {
            toast('Password has changed successfully', {
                type: 'success',
                position: 'top-center'
            })
            setOldPassword('');
            setPassword('');
            return;
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

    }, [isUpdated, error, dispatch])

    return (
        <>
            <MetaData title={'Update Profile'} />
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">UPDATE PASSWORD</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="oldpass" placeholder="password" name="email" onChange={(e) => setOldPassword(e.target.value)} />
                                <label htmlFor="oldpass">Old Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="pass" placeholder="Password" name="name" onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="pass">Password</label>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" >Change Password</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}