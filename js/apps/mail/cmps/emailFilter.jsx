import { EmailSort } from "./emailSort";

export class EmailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '', // no need to support complex text search
            isRead: null, // (optional property, if missing: show all)
        },
    };

    handleChange = (ev) => {
     
        const field = ev.target.name
        let value = ev.target.value
        if (value === 'read') value = true;
        if (value === 'unread') value = false;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        });
    };

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
    };


    render() {
        const { txt, isRead } = this.state.filterBy
        return (
            <section className="mails-filter">
                <form className='emails-filter' onSubmit={this.onFilter}>
                    <div className="txt-filter">
                        <label htmlFor='by-txt'></label>
                        <input
                            className="search-box"
                            name='txt'
                            id='by-txt'
                            type='text'
                            placeholder='Search Mails...'
                            value={txt}
                            autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="read-filter">
                        <label className="filter-by" htmlFor="filterBy">Filter : </label>
                        <select  className="is-read" name="isRead" onChange={this.handleChange} >
                            <option name="isRead" value='read' >Unread</option>
                            <option name="isRead" value='unread' >Read</option>
                        </select>
                    </div>
                    <button className="filter-btn clear-btn">Filter</button>
                </form>
            </section>
        )
    }
    //    render() {
    //         const { txt, isRead} = this.state.filterBy
    //         return (
    //             <secti className="mails-filter">
    //                 
    //                 <div className="txt-filter">
    //                     <label htmlFor='by-txt'>By subject</label>
    //                     <input
    //                         name='txt'
    //                         id='by-txt'
    //                         type='text'
    //                         placeholder='Search mails...'
    //                         value={txt}
    //                         onChange={this.handleChange}
    //                     />
    //                 </div>
    //             </secti on>
    //         )
    //     }
}
