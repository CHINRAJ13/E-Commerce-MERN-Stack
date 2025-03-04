import { MetaData } from '../Layouts/MetaData'
import { MDBDataTable } from 'mdbreact'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { userOrders as userOrdersAction } from '../../action/orderAction'
import { Link } from 'react-router-dom'


export const UserOrder = () => {

    const { userOrders={} } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction)
    },[])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: "numOfItems",
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: "amount",
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: "status",
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: "actions",
                    sort: 'asc'
                }
            ],
            rows: []
        }

        userOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && order.orderStatus.includes('Delivered') ? 
                (<p className='text-success'>{order.orderStatus}</p>) : (<p className='text-danger'>{order.orderStatus}</p>),
                actions: <Link to={`/order/${order._id}`} className='btn btn-primary'><i className='bi bi-eye-fill'></i></Link>
            })
        })

        return data;
    }

    return (
        <>
            <MetaData title={'My Orders'} />
            <h2 className='mt-5'>My Orders</h2>
            <MDBDataTable
                className='px-3'
                bordered
                striped
                hover
                data={setOrders()}
            />
        </>
    )
}