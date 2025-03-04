export const ProductReview = ({reviews}) => {
    return <>
    <div className="Review w-75">
        <h4>Other Reviews</h4>
        <hr />
        {reviews && reviews.map(review => ( 
            <div key={review._id} >
                <div className="d-flex gap-2 pb-3">
                    {[...Array(5)].map((star, index) => (
                    <i
                    key={index} className={
                        index < review.rating ? 'bi bi-star-fill' : 'bi bi-star'
                        } style={{ color: '#ffc107' }} ></i>
                    ))}
                </div>
                <p>By {review.user.name}</p>
                <h6>{review.comment}</h6>
            </div>
        ))}
    </div>
    </>
}