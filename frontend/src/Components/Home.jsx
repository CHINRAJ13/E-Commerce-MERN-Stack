import { useEffect, useState } from "react"
import { MetaData } from "./Layouts/MetaData"
import { getProducts } from "../action/productAction"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "./Layouts/Loading"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import Pagination from 'react-js-pagination'

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, productsCount, resPerPage, loading, error } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategry] = useState('');

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Headphones',
        'Accessories'
    ];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    }

    useEffect(() => {
        if (error) {
            return toast.error(`${error}`, {
                position: "top-center",
                theme: 'dark'
            });
        }

        dispatch(getProducts(null, currentPage, category))
    }, [error, dispatch, currentPage, null, category]);

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Best Products'} />

            <h1>Latest Products</h1>
            <div className="container my-3">
                <div className="row row-cols-2">
                    <div className="col-md-3 col-lg-2">
                        <h5 className="mb-3 fw-semibold border-bottom pb-2">Categories</h5>
                        <ul className="list-group list-group-flush">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={`list-group-item list-group-item-action`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setCategry(category)}
                                >
                                    <i className="bi bi-tag me-2"></i>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-10">

                        {/* <div className="row g-4">
                            {products && products.map(product => (
                        <div className="col-12 col-md-4" key={product._id}>
                            <div className="card">
                                <img src={product.images[0].image} className="card-img-top p-2" style={{ objectFit: 'contain' }} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/${product._id}`)}>{product.name}</h5>
                                    <p>{[...Array(5)].map((star, index) => (
                                        <i
                                            key={index}
                                            className={
                                                index < parseInt(product.ratings) ? 'bi bi-star-fill' : 'bi bi-star'
                                            }
                                            style={{ color: '#ffc107' }} // Yellow for filled stars
                                        ></i>
                                    ))} <span>({product.numOfReviews} Reviews)</span></p>

                                    <p className="h5">$ {product.price}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/${product._id}`)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}

                        </div> */}
                        <div className="row row-cols-1 row-cols-md-3 g-5 mt-3">
                            {products && products.map((product) => <div className="col" key={product._id}>
                                <div className="border rounded shadow d-flex flex-column justify-content-center p-3 h-100">
                                    <img src={product.images[0].image} className="img-fluid mb-2" alt="" />
                                    <div>
                                        <h5 onClick={() => navigate(`/${product._id}`)}>{product.name}</h5>
                                        <p>{[...Array(5)].map((star, index) => (
                                            <i
                                                key={index}
                                                className={
                                                    index < parseInt(product.ratings) ? 'bi bi-star-fill' : 'bi bi-star'
                                                }
                                                style={{ color: '#ffc107' }} // Yellow for filled stars
                                            ></i>
                                        ))} </p>
                                        <p><span>({product.numOfReviews} Reviews)</span></p>
                                        <p className="h5">$ {product.price}</p>
                                        <div className="">
                                            <button className="btn btn-primary" onClick={() => navigate(`/${product._id}`)}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
                {productsCount > 0 && productsCount > resPerPage ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            onChange={setCurrentPageNo}
                            totalItemsCount={productsCount}
                            itemsCountPerPage={resPerPage}
                            nextPageText={'Next'}
                            prevPageText={'Pre'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                ) : null}
            </div>
        </>
    )
}