import { storageService } from "../services/storage.service.js";
import { bookService } from '../services/book.service.js';

export function ReviewsPreview({ review, id, onDeleteReview }) {



    return (
        <div className="review-card">
            <p className="remove-review-btn"><i className="fa fa-times" onClick={() => onDeleteReview(id, review.id)}></i></p>
            <div className="user-info">
                <h3 className="review-user-name"><span>Review by: </span>{review.name} </h3>
                <div className="read-stars-conatiner">
                    <p className="read-at">{review.readAt}</p>
                    <div className="stars-container">
                        {review.rate >= 1 && <img className="star" src="../assets/img/star.png" />}
                        {review.rate >= 2 && <img className="star" src="../assets/img/star.png" />}
                        {review.rate >= 3 && <img className="star" src="../assets/img/star.png" />}
                        {review.rate >= 4 && <img className="star" src="../assets/img/star.png" />}
                        {review.rate >= 5 && <img className="star" src="../assets/img/star.png" />}
                    </div>
                </div>
            </div>
<div className="txt-container">
            <p>"{review.txt}"</p>
</div>

        </div>

    )



}

