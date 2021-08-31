export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            noteType: '',
            txt: ''
        },
    };
    
    waitUntil() {}

    handleChange = (ev) => {
        const { name, value } = ev.target
        this.setState({ filterBy: { ...this.state.filterBy, [name]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        });
    };



    render() {
        const { noteType, txt } = this.state
        return (
            <section className="note-filter">
                <select className="select-filter" name={'noteType'} onChange={this.handleChange}>
                    <option value={'all'}>All </option>
                    <option value={'note-txt'}>Text</option>
                    <option value={'note-img'}>Image</option>
                    <option value={'note-video'}>Video</option>
                    <option value={'note-todo'}>Todo</option>
                </select>
                <form className='note-filter flex' onSubmit={this.onSetFilter}>
                    <label htmlFor='by-type'></label>
                    <input name='txt' id='by-type' type='text' placeholder='Search Note By Title' value={txt} onChange={this.handleChange} />
                    {/* <label htmlFor='by-min-price'>Min</label>
                <input name='minPrice' id='by-min-price' type='number' placeholder='enter min price' value={minPrice} onChange={this.handleChange} />
                <label htmlFor='by-max-price'>Max</label>
            <input name='maxPrice' id='by-max-price' type='number' placeholder='enter max price' value={maxPrice} onChange={this.handleChange} /> */}
                </form>
            </section>
        )
    }

}