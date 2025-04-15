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
    const { product = {}, loading, error, isReviewSubmitted } = useSelector(state => state.productState);
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

        if (!product._id || isReviewSubmitted) {
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

                        {/* Product Images */}
                        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
                            <Carousel pause="hover">
                                {product.images?.map(image => (
                                    <Carousel.Item key={image._id}>
                                        <img
                                            src={image.image}
                                            alt={product.name}
                                            className="d-block w-100 rounded shadow"
                                            height={500}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        {/* Product Details */}
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-md-2">
                            <h2>{product.name}</h2>
                            <p><b>ID:</b> {product._id}</p>
                            <hr />

                            {/* Ratings */}
                            <p className="mb-1">
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={index < Math.round(product.ratings) ? "bi bi-star-fill" : "bi bi-star"}
                                        style={{ color: "#ffc107" }}
                                    />
                                ))}
                                <span className="ms-2">({product.numOfReviews} Reviews)</span>
                            </p>

                            <h5 className="text-success">$ {product.price}</h5>
                            <hr />

                            {/* Quantity & Cart */}
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <button className="btn btn-danger" onClick={decreaseQty}><b>-</b></button>
                                <input
                                    type="number"
                                    className="form-control text-center"
                                    style={{ width: "60px" }}
                                    value={quantity}
                                    readOnly
                                />
                                <button className="btn btn-primary" onClick={increaseQty}><b>+</b></button>

                                <button
                                    className="btn btn-warning"
                                    disabled={product.stock === 0}
                                    onClick={() => {
                                        dispatch(addCartItem(product._id, quantity));
                                        toast('Product added to cart', {
                                            type: 'success',
                                            position: 'top-center',
                                        });
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <p className="mt-3">
                                Status: <b>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</b>
                            </p>

                            <hr />
                            <h4>Description</h4>
                            <p className="text-break">{product.description}</p>

                            <p><b>Sold by:</b> {product.seller}</p>

                            {/* Review Button or Login Prompt */}
                            {user ? (
                                <button className="btn btn-outline-warning mt-3" onClick={handleShow}>
                                    Submit Your Review
                                </button>
                            ) : (
                                <div className="bg-danger text-light p-2 rounded mt-3">Login to post a review</div>
                            )}
                        </div>

                        {/* Review Modal */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="text-center">
                                    {[1, 2, 3, 4, 5].map(index => (
                                        <i
                                            key={index}
                                            className={index <= (hover || rating) ? "bi bi-star-fill" : "bi bi-star"}
                                            style={{ color: "#ffc107", cursor: "pointer", fontSize: "24px" }}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    ))}
                                </div>
                                <textarea
                                    name="review"
                                    id="review"
                                    className="form-control mt-3"
                                    rows={4}
                                    placeholder="Write your review..."
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleReview}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Display Reviews */}
                        {product.reviews?.length > 0 && (
                            <div className="mt-4">
                                <ProductReview reviews={product.reviews} />
                            </div>
                        )}
                    </div>
                )}
            </div>

        </>
    )
}