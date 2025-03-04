import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { clearOrderDeleted, clearOrderError } from "../../slice/orderSlice";
import { deleteOrder, getAdminOrders } from "../../action/orderAction";
import {Loading} from '../Layouts/Loading';
import {MetaData} from '../Layouts/MetaData';
import {MDBDataTable} from 'mdbreact'
import { Sidebar } from "./SideBar";
import { Button } from "react-bootstrap";



export const OrderList = () => {

    const { adminOrders = [], loading, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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
        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$ ${order.totalPrice}`,
                status: <p className={order.orderStatus.includes('Processing') ? 'text-danger' : 'text-success'}>{order.orderStatus}</p>,
                actions: (
                    <>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"><i className="bi bi-pencil-square"></i></Link>
                        <Button onClick={(e) => handleDelete(e, order._id)} className="btn btn-danger mx-2"><i className="bi bi-trash3-fill"></i></Button>
                    </>
                )
            })
        })
        return data;
    }

    const handleDelete = (e, id) => {
        e.currentTarget.disabled = true;
        dispatch(deleteOrder(id));
    }

    useEffect(() => {

        if(isOrderDeleted) {
            toast(`Order has deleted Successfully`, {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'top-center',
                theme: 'dark',
                onOpen: () => dispatch(clearOrderError())
            })
            return;
        }

        dispatch(getAdminOrders)
    }, [error, dispatch, isOrderDeleted])

    if(loading) return <Loading />

    return (
        <>
        <MetaData title={'Order List'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h3>Order List</h3>
                    <MDBDataTable 
                    data= {setOrders()}
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