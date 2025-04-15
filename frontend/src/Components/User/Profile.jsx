import { useSelector } from "react-redux"
import { Loading } from "../Layouts/Loading";
import { MetaData } from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";


export const Profile = () => {

    const { user, loading, error } = useSelector(state => state.authState);
    const navigate = useNavigate();

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'User Profile'} />
            <div className="container my-5">
                {user && (
                    <>
                        <h3 className="text-center mb-4">USER PROFILE</h3>
                        <div className="row justify-content-center align-items-start g-5">
                            <div className="col-12 col-md-5 d-flex flex-column align-items-center">
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="img-fluid mb-3"
                                    style={{ borderRadius: '50%', width: '250px', height: '250px', objectFit: 'cover' }}
                                />
                                <button
                                    className="btn btn-warning w-100"
                                    onClick={() => navigate('/myprofile/update')}
                                >
                                    Edit Profile
                                </button>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="mb-4">
                                    <h5>Full Name</h5>
                                    <p>{user.name}</p>
                                </div>
                                <div className="mb-4">
                                    <h5>Email Address</h5>
                                    <p>{user.email}</p>
                                </div>
                                <div className="mb-4">
                                    <h5>Created At</h5>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                                <div className="d-grid gap-3 mt-4">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => navigate('/orders')}
                                    >
                                        My Orders
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate('/password/change')}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}