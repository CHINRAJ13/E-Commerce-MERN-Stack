import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../action/userAction";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
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
        if(isAuthenticated){
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
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">REGISTER</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" onChange={onChange} />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" placeholder="Name" name="name" onChange={onChange} />
                                <label htmlFor="name">Full Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label text-secondary border p-2 w-100 rounded">Avatar</label>
                                <input className="form-control d-none" type="file" id="formFile" name='avatar' onChange={onChange} />
                                <div>
                                    <img src={avatarPreview} alt="Avatar" height='50' width='50' style={{ borderRadius: '50px' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" disabled={loading}>Register</button>
                            </div>
                            <p className="text-center">Already a member? <a href="/register">Login</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}