import { useDispatch, useSelector } from "react-redux"
import { MetaData } from "../Layouts/MetaData"
import { Sidebar } from "./SideBar"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Layouts/Loading";
import { getSingleUser, updateUser } from "../../action/userAction";
import { toast } from "react-toastify";
import { clearUserError, clearUserUpdated } from "../../slice/userSlice";



export const UpdateUser = () => {

    const { user = {}, loading, error, isUserUpdated } = useSelector(state => state.userState);
    const { user: authUser } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { name: name, email: email, role: role };
        dispatch(updateUser(id, formData));
    }

    useEffect(() => {
        if (isUserUpdated) {
            toast(`User Details has updated successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearUserUpdated())
            })
            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'top-center',
                onOpen: () => dispatch(clearUserError())
            })
            return;
        }

        dispatch(getSingleUser(id));
    }, [id, dispatch, isUserUpdated, error])

    useEffect(() => {
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user])

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Update User'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {/* <h3>Product List</h3> */}
                    <div className="row justify-content-center align-items-center my-5">
                        <div className="col-md-6 col-lg-5 shadow-sm p-4 rounded border bg-white">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center mb-4 text-primary fw-bold">Update User</h3>

                                {/* User Name */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>

                                {/* Email */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                {/* Role */}
                                <div className="form-floating mb-3">
                                    <select
                                        disabled={user._id === authUser._id}
                                        className="form-select"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <label htmlFor="role">Role</label>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid mt-4">
                                    <button
                                        className="btn btn-primary fw-bold"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        {loading ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}