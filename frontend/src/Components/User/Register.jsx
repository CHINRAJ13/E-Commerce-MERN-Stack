import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../action/userAction";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../Layouts/MetaData"


export const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/default.png');
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState == 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
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
    }, [error, isAuthenticated, navigate, dispatch])

    return (
        <>
            <MetaData title={'Register'} />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4">REGISTER</h5>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Full Name"
                                    name="name"
                                    onChange={onChange}
                                    required
                                />
                                <label htmlFor="name">Full Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    name="email"
                                    onChange={onChange}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={onChange}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label text-secondary border p-2 w-100 rounded text-center cursor-pointer">
                                    Upload Avatar
                                </label>
                                <input
                                    className="form-control d-none"
                                    type="file"
                                    id="formFile"
                                    name="avatar"
                                    onChange={onChange}
                                />
                                {avatarPreview && (
                                    <div className="text-center mt-2">
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar Preview"
                                            height="50"
                                            width="50"
                                            style={{ borderRadius: '50px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="d-grid my-4">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>

                            <p className="text-center mb-0">
                                Already a member? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}