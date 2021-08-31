export function SearchList({ books, onAddNewBook }) {

    if (books) {

        return (
            <ul className="search-list">
                {books.map((book) => {
                    return <li key={book.id}><div className="search-txt">
                        <p>{book.volumeInfo.title}</p>
                    </div>
                        <span><i className="fa fa-plus" onClick={() => onAddNewBook(book)}></i></span></li>
                })}
            </ul>
        )

    }
}