import { useDispatch, useSelector } from "react-redux";
import { MetaData } from "../Layouts/MetaData";
import { useEffect, useState } from "react";
import { clearAuthError, clearProfileUpdate, updateProfile } from "../../action/userAction";
import { toast } from "react-toastify";
import { Loading } from "../Layouts/Loading";

export const UpdateProfile = () => {

    const { user, loading, isUpdated, error } = useSelector(state => state.authState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/default.png');
    const dispatch = useDispatch();

    const changeAvatar = () => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            toast('Profile has updated successfully', {
                type: 'success',
                position: 'top-center',
                onOpen: () => { dispatch(clearProfileUpdate) }
            })
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

    }, [user, isUpdated, error, dispatch])

    // if(loading) return <Loading />

    return (
        <>
            <MetaData title={'Update Profile'} />
            <div className="d-flex justify-content-center my-5">
                <form onSubmit={handleSubmit}>
                    <div className="card" style={{ width: "30rem" }}>
                        <div className="card-body">
                            <h5 className="text-center">UPDATE PROFILE</h5>
                            <hr />
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="name">Full Name</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label text-secondary border p-2 w-100 rounded">Avatar</label>
                                <input className="form-control d-none" type="file" id="formFile" name='avatar' onChange={changeAvatar} />
                                <div>
                                    <img src={avatarPreview} alt="avatar" height='50' width='50' style={{ borderRadius: '50px' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <button className="btn btn-primary" type="submit" >Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}