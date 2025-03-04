import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReview, getProduct } from "../../action/productAction";
import { useParams } from "react-router-dom";
import { MetaData } from "../Layouts/MetaData";
import { Loading } from "../Layouts/Loading";
import { Button, Carousel } from 'react-bootstrap'
import { addCartItem } from "../../action/cartAction";
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { clearError, clearProduct, clearReviewSubmitted } from '../../slice/productSlice'
import { ProductReview } from "./ProductReview";

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product={}, loading, error, isReviewSubmitted } = useSelector(state => state.productState);
    const { user } = useSelector(state => state.authState);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReview = () => {
        setShow(false);
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose();
            toast('Review Submitted Successfully', {
                type: 'success',
                position: 'top-center',
                onOpen: () => dispatch(clearReviewSubmitted())
            })
        }

        if (error) {
            toast(`${error}`, {
                position: "top-center",
                theme: 'dark',
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        if(!product._id || isReviewSubmitted) {
            dispatch(getProduct(id));
        }

        return () => dispatch(clearProduct());

    }, [dispatch, id, isReviewSubmitted, error])

    if (loading) return <Loading />

    return (
        <>
            <div className="container">

                {product && (
                    <div className="row my-4">
                        <MetaData title={product.name} />
                        <div className="col-md-5 col-sm-12">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image =>
                                    <Carousel.Item key={image._id}>
                                        <img src={image.image} alt={product.name} height={500} width={500} className="d-block w-100" />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                        <div className=" col-md-5 col-sm-12 mx-2">
                            <div>
                                <h2>{product.name}</h2>
                                <p><b>ID: </b>{product._id}</p>
                                <hr />

                                <p>{[...Array(5)].map((star, index) => (
                                    <i
                                        key={index}
                                        className={
                                            index < parseInt(product.ratings) ? 'bi bi-star-fill' : 'bi bi-star'
                                        }
                                        style={{ color: '#ffc107' }} // Yellow for filled stars
                                    ></i>
                                ))} <span>({product.numOfReviews} Reviews)</span></p>

                                <hr />
                                <h5>$ {product.price}</h5>

                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-danger text-light" onClick={decreaseQty}><b>-</b></button>
                                    {/* <h5 className="count">{quantity}</h5> */}
                                    <input type="number" className="form-control count d-inline " style={{ width: '60px' }} value={quantity} readOnly />
                                    <button className="btn btn-primary text-light" onClick={increaseQty}><b>+</b></button>

                                    <button className="btn btn-warning"
                                        disabled={product.stock == 0 ? true : false}
                                        onClick={() => {
                                            dispatch(addCartItem(product._id, quantity));
                                            toast('Product added to cart', {
                                                type: 'success',
                                                position: 'top-center'
                                            });
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                                <hr />
                                <p>Status: <b>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</b></p>
                                <hr />
                                <h4>Description</h4>
                                <p className="text-break">{product.description}</p>
                                <hr />
                                <p>Sold by: <b>{product.seller}</b></p>
                            </div>
                            {user ? 
                            <button className="btn btn-warning" onClick={handleShow}>Submit Your Review</button> :
                            <div className="bg-danger opacity-75 text-light rounded p-2">Login to Post the Review</div>
                            }

                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><h1>{[1, 2, 3, 4, 5].map((index) => (
                                <i
                                    key={index}
                                    className={index <= (hover || rating) ? "bi bi-star-fill" : "bi bi-star"}
                                    style={{ color: "#ffc107", cursor: "pointer", fontSize: "24px" }}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                ></i>
                            ))}</h1><hr />
                                <textarea name="review"
                                    id="review"
                                    className="form-control mt-3"
                                    onChange={(e) => setComment(e.target.value)}
                                >

                                </textarea>
                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button> */}
                                <Button variant="primary" onClick={handleReview}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {product.reviews && product.reviews.length > 0 ? 
                        <ProductReview reviews={product.reviews} /> : null   
                        }
                    </div>
                )}
            </div>
        </>
    )
}