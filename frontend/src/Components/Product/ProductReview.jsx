export const ProductReview = ({ reviews }) => {
    return <>
        <div className="Review w-75 mx-auto mt-4">
            <h4 className="mb-3">Other Reviews</h4>
            <hr />

            {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="mb-4 border-bottom pb-3">
                        {/* Star Rating */}
                        <div className="d-flex align-items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <i
                                    key={index}
                                    className={index < review.rating ? 'bi bi-star-fill' : 'bi bi-star'}
                                    style={{ color: '#ffc107', fontSize: '18px' }}
                                />
                            ))}
                        </div>

                        {/* Reviewer Name */}
                        <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                            By <b>{review.user.name}</b>
                        </p>

                        {/* Comment */}
                        <p className="mb-0">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-muted">No reviews yet.</p>
            )}
        </div>

    </>
}