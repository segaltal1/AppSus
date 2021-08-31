const { Link, Route } = ReactRouterDOM
import { bookService } from "../services/book.service.js";
import { ReviewsList } from "../cmps/ReviewsList.jsx";
import { LongTxt } from '../cmps/LongTxt.jsx'
export class BookDetails extends React.Component {

  state = {

    book: null
  }

  componentDidMount() {
    this.loadBook()

  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  loadBook = () => {
    const id = this.props.match.params.bookId
    bookService.getBookById(id)
      .then(book => {
        if (!book) this.props.history.push('/')
        this.setState({ book })
      })
  }

  onDeleteBook = () => {
    bookService.deleteBook(this.state.book.id).then(this.onBack)
  }

  onDeleteReview = (id, reviewId) => {
    bookService.deleteReview(id, reviewId)
      .then(this.loadBook)

  }
  onBack = () => {
    this.props.history.push('/book')
  }



  render() {
    const { book } = this.state
    if (!book) return <div>Loading...</div>
    return (
      <section className="book-card" >
        <section className='book-info-card'>
          <div className="book-img-container">
            <img src={book.thumbnail} alt='' />
            <div className={`sale-sign ${book.listPrice.isOnSale && 'show'}`}>Sale</div>
          </div>
          <div className="book-info">
            <h2> {book.title}</h2>
            <h4>Author {book.authors}</h4>
            <h4 className="book-age">{bookService.getCurrAge(book.publishedDate)}</h4>
            <p>Tags: {book.categories.join(' ')}  </p>
            <p> {bookService.getCurrLang(book.language)} | {bookService.getPageCount(book.pageCount)} </p>
            <p>{book.subtitle}</p>
            <h3 className={(book.listPrice.amount < 20) ? 'Green' : (book.listPrice.amount > 150) ? 'Red' : ''}>Price: {bookService.getPriceCurr(book.listPrice.currencyCode)}{book.listPrice.amount} </h3>

            <div className="btn-container">

              <button className="back-btn" onClick={this.onBack}>Go Back</button>
              <button className="delete-btn"
                onClick={this.onDeleteBook}
              >
                Delete Book
              </button>
              <button  className="add-review-btn"><Link to={`/book/${book.id}/review`}>Add Review</Link></button>
              <div className="book-paging">
              <button className="prev-page"><Link to={`/book/${bookService.getPrevBookId(book.id)}`}>Previous Book</Link></button>
              <button className="next-page"><Link to={`/book/${bookService.getNextBookId(book.id)}`}>Next Book</Link></button>
              </div>


            </div>
          </div>
        </section>
        <div className="book-desc">
          <LongTxt text={book.description} />
        </div>
        <section className="book-reviews">
          <h2>Book Reviews</h2>
          <ReviewsList book={book} onDeleteReview={this.onDeleteReview} />
        </section>
      </section>
    );
  }
}
