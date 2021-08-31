import { ReviewsPreview } from './ReviewsPreview.jsx'
export function ReviewsList({ book, onDeleteReview }) {
    const reviews = book.reviews
    if (reviews) {
        return (
            <section className="reviews-container">
                {reviews.map(review => <ReviewsPreview key={review.id} review={review} id={book.id} onDeleteReview={onDeleteReview} />)}
            </section>
        )
    } else return (
        <section className="reviews-container">
        <p>No reviews to show...</p>
        </section>
    )
}
