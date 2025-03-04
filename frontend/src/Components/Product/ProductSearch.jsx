import { useEffect, useState } from "react"
import { MetaData } from "../Layouts/MetaData"
import { getProducts } from "../../action/productAction"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../Layouts/Loading"
import { toast } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom"
import Pagination from 'react-js-pagination'

export const ProductSearch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, productsCount, resPerPage, loading, error } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const { keyword } = useParams();

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

        dispatch(getProducts( keyword, currentPage, null))
    }, [error, dispatch, currentPage, keyword]);

    if (loading) return <Loading />

    return (
        <>
            <MetaData title={'Search Products'} />

            <h1>Search Products</h1>
            <div className="container my-3">
                <div className="row g-4 px-5">
                    {/* Product 1 */}
                    {products && products.map(product => (
                        <div className="col-12 col-md-4 col-lg-3" key={product._id}>
                            <div className="card">
                                <img src={product.images[0].image} className="card-img-top p-2" style={{ height: '200px', width: '100%', objectFit: 'contain' }} alt="..." />
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