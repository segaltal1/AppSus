import { bookService } from '../services/book.service.js';

export class AddReview extends React.Component {
    state = {
        book: null,
        review: {
            name: 'Books Reader',
            rating: null,
            readAt: `${new Date().getDate()}/${ new Date().getMonth()+1}`,
            txt: null
        }
    }
    componentDidMount() {
        this.loadBook();
    }

    loadBook = () => {
        const id = this.props.match.params.bookId
        if (!id) return
        bookService.getBookById(id)
            .then(book => this.setState(prevState => ({ book: book, review: { ...prevState.review } })))
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ book: { ...prevState.book }, review: { ...prevState.review, [field]: value } }))
   
    }

    formSubmited = (ev) => {
        const id = this.props.match.params.bookId
        ev.preventDefault()

        bookService.saveReview(this.state)
        .then(()=>{this.props.history.push(`/book/${id}`);})

    }

    render() {
        return (
            <section className="review-form">
                <h6 id="fh6">Your review will help us to improve our web hosting quality products, and customer services.</h6>
                <form action="" name="review" onSubmit={this.formSubmited}>

                    <div className="input-group">
                        <span><i className="fa fa-user"></i></span>
                        <input type="text" name="name" placeholder="Enter Full Name" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <div className="inputGroupContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-heart"></i></span>
                                <select name="rating" className="form-control" id="rate" onChange={this.handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <span><i className="fa fa-book"></i></span>
                        <input type="text" name="readAt" placeholder="Read At..." onChange={this.handleChange} />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-pencil"></i></span>
                        <textarea name="txt" className="txt-area" id="review" rows="3" placeholder="Feel free to write us..." onChange={this.handleChange}></textarea>

                    </div>
                    <button onClick={this.formSubmited}>Submit </button>
                </form>
            </section>
        )
    }
}