import { MetaData } from '../Layouts/MetaData'
import {Link} from 'react-router-dom'


export const OrderSuccess = () => {
    return (
        <>
            <MetaData title={'Order Success'} />
            <div className="container my-3">
                <div className="image d-flex justify-content-center my-3">
                    <img src="/success.png" alt="success" className="d-block w-50" />
                </div>
                <div className="text d-flex flex-column">
                    <h2 className="text-center text-break">Your Order has placed Successfully</h2>
                    <Link to={'/orders'} className='text-center'>Go to orders</Link>
                </div>
            </div>
        </>
    )
}