export class EmailSort extends React.Component {
    state = {
        sortBy: ' ',
    };

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ sortBy:value } , () => {
            this.props.onSetSort(this.state.sortBy)
        });
    };
 

    render() {
        return (
            <section className="mails-sort">
                <label className="sort-by" htmlFor="sortBy">Sort: </label>
                <select  className="sort-by" name="sortBy" onChange={this.handleChange} >
                    <option value="newest" >Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="title">Title</option>
                </select>
            </section>
        )
    }
}
