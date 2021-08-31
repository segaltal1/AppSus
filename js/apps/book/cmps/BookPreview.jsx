const { Link } = ReactRouterDOM

export function BookPreview({ book, currency }) {
    let currSign;
    switch (currency) {
        case 'EUR':
            currSign = '\u20AC'
            break;
        case 'USD':
            currSign = '$'
            break;
        case 'ILS':
            currSign = String.fromCharCode('0x20aa')
            break;

    }

    return (
        <article className="book-preview">
            <div className="book-img">
                <img src={book.thumbnail} alt="" />
                <div className={`sale-sign ${book.listPrice.isOnSale && 'show'}`}>Sale</div>
            </div>
            <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.authors}</p>
           <h4 className={`price ${(book.listPrice.amount < 20) ? 'Green' : (book.listPrice.amount > 150) ? 'Red' : ''}`}>{currSign}{book.listPrice.amount}</h4>
           <Link to={`/book/${book.id}`} >Book Details</Link>
         
            </div>
        </article>
    )
}