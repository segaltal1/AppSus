import {BookPreview} from './BookPreview.jsx'
export function BookList({books}) {
 
  return (
   <div className="book-list">
      {books.map(book => <BookPreview key={book.id} currency={book.listPrice.currencyCode} book={book}  />)}
      </div>
  )
}
