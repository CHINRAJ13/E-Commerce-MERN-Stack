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
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4">UPDATE PASSWORD</h5>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="oldpass"
                                    placeholder="Old Password"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="oldpass">Old Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newpass"
                                    placeholder="New Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="newpass">New Password</label>
                            </div>

                            <div className="d-grid my-4">
                                <button className="btn btn-primary" type="submit">
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}