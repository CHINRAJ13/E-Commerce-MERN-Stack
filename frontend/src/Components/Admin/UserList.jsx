import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../../action/userAction';
import { useEffect } from 'react';
import { Loading } from '../Layouts/Loading';
import { MetaData } from '../Layouts/MetaData';
import { Sidebar } from './SideBar';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { clearUserDeleted, clearUserError } from '../../slice/userSlice';


export const UserList = () => {

    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <>
                    <Link to={`/admin/user/${user._id}`} className='btn btn-primary' ><i className='bi bi-pencil-square'></i></Link>
                    <Button onClick={(e) => handleDelete(e, user._id)} className="btn btn-danger mx-2"><i className="bi bi-trash3-fill"></i></Button>
                </>
            })
        })
        return data;
    }

    const handleDelete = (e, id) => {
        e.currentTarget.disabled = true;
        dispatch(deleteUser(id));
    }

    useEffect(() => {

        if(isUserDeleted) {
            toast('User has deleted Successfully', {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        if(error) {
            toast(error, {
                type: 'error',
                theme:'dark',
                position: 'top-center',
                onOpen: () => dispatch(clearUserError())
            })
        }

        dispatch(getUsers)
    }, [dispatch, isUserDeleted, error]);

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'User List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h3>Order List</h3>
                    <MDBDataTable
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                </div>
            </div>
        </>
    )
}