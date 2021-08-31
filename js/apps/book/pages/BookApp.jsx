const { NavLink, Route, Switch } = ReactRouterDOM
import { bookService } from '../services/book.service.js';
import { BookList } from '../cmps/BookList.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookAdd } from '../cmps/BookAdd.jsx';
import { eventBusService } from "../services/event-bus-service.js"

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
    selectedBook: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    bookService.query(this.state.filterBy).then((books) => {
      this.setState({ books })

    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  onSelectBook = (book) => {
    this.setState({ selectedBook: book });
  };

  onDeleteBook = (bookId) => {
    bookService.deleteBook(bookId)
    this.onSelectBook(null)
    this.loadBooks()
  }
  onAddNewBook = (book) => {
    // console.log('book',book);
    bookService.addGoogleBook(book)
      .then(this.loadBooks())
    eventBusService.emit("search-list", this.state.rating);


  }
  render() {
    const { books, selectedBook } = this.state;
    if (!books.length && !this.state.filterBy) return <div>Loading...</div>
    return (
      <section className='book-app'>
        {!selectedBook && (
          <React.Fragment>
            <BookAdd onAddNewBook={this.onAddNewBook} />
            <BookFilter onSetFilter={this.onSetFilter} />
            <BookList books={books} onSelectBook={this.onSelectBook} />
          </React.Fragment>
        )}
        {selectedBook && <BookDetails book={selectedBook} onBack={() => this.onSelectBook(null)} onDeleteBook={this.onDeleteBook} />}
      </section>
    );
  }
}
