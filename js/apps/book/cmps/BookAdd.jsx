import { bookService } from "../services/book.service.js";
import { storageService } from "../services/storage.service.js";
import { SearchList } from "./SearchList.jsx";
import { eventBusService } from "../services/event-bus-service.js"



export class BookAdd extends React.Component {

    state = {
        searchedBook: '',
        books: null
    }
    inputRef = React.createRef()
    componentDidMount() {
        this.inputRef.current.focus()
        this.removeEventBus = eventBusService.on("search-list", () => {
            this.setState({ searchedBook: ' ', books: null })
        });
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    handleChange = ({ target }) => {
        this.setState({ books: null, searchedBook: target.value }, () => { this.searchBooks(target.value) })
    }
    searchBooks(searchVal) {
        bookService.getGoogleBooks(searchVal)
            .then((books) => { this.setState({ books}) })

        // .then(() => { console.log(this.state.books); })
    }



    render() {
        const { searchedBook, books } = this.state
        return <div className="search-box">
            <input ref={this.inputRef} autoComplete="off" type="search" value={searchedBook} name="search-input" placeholder="Search a book..." onChange={this.handleChange} />
            {books && <SearchList onAddNewBook={this.props.onAddNewBook} books={books} />}
        </div>
    }
}
