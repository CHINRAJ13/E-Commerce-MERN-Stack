import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../../action/userAction';
import { useEffect, useState } from 'react';
import { Loading } from '../Layouts/Loading';
import { MetaData } from '../Layouts/MetaData';
import { Sidebar } from './SideBar';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { clearUserDeleted, clearUserError } from '../../slice/userSlice';
import { deleteReview, getReviews } from '../../action/productAction';
import { clearError, clearReviewDeleted } from '../../slice/productSlice';


export const ReviewList = () => {

    const [prodId, setProdId] = useState('');

    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'raing',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user.name,
                comment: review.comment,
                actions: <>
                    <Button onClick={(e) => handleDelete(e, review._id)} className="btn btn-danger mx-2"><i className="bi bi-trash3-fill"></i></Button>
                </>
            })
        })
        return data;
    }

    const handleDelete = (e, id) => {
        e.currentTarget.disabled = true;
        dispatch(deleteReview(prodId, id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getReviews(prodId));
    }

    useEffect(() => {

        if(isReviewDeleted) {
            toast('Review has deleted Successfully', {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(prodId));
            return;
        }

        if(error) {
            toast(error, {
                type: 'error',
                theme:'dark',
                position: 'top-center',
                onOpen: () => dispatch(clearError())
            })
        }

        
    }, [dispatch, isReviewDeleted, error]);

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Reviews List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h3>Review List</h3>
                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Product ID:</label>
                                    <input 
                                    type="text"
                                    className='form-control'
                                    onChange={e => setProdId(e.target.value)}
                                    value={prodId}
                                    />
                                </div>
                                <button type='submit' disabled={loading} className='btn btn-primary btn-block my-3'>Search</button>
                            </form>
                        </div>
                    </div>
                    <MDBDataTable
                        data={setReviews()}
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