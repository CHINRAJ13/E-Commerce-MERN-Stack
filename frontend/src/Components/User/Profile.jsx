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
            {user &&
                <>
                    <h2>User Profile</h2>
                    <div className="row gap-5">
                        <div className="col-5 d-flex flex-column">
                            <img src={user.avatar} alt="Image" className=" mb-3" style={{ borderRadius: '50%' }} height={300} width={300} />
                            <button className="btn btn-warning" onClick={() => navigate('/myprofile/update')}>Edit Profile</button>
                        </div>
                        <div className="col-5 d-flex flex-column justify-content-around">
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email Address</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Created At</h4>
                                <p>{String(user.createdAt).substring(0,10)}</p>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <button className="btn btn-danger" onClick={() => navigate('/orders')}>My Order</button>
                                <button className="btn btn-primary" onClick={() => navigate('/password/change')}>Change Password</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}