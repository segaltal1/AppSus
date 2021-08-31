export class EditNote extends React.Component {
    state = {
        txtInput: ' ',
    };

    handleChange = (ev) => {
        this.setState({ txtInput: ev.target.value })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { onChangeNote } = this.props
        const { txtInput } = this.state
        onChangeNote(txtInput)
    }

    render() {
        const { txtInput } = this.state
        const { onChangeNote } = this.props
        if (!txtInput) return <div>Loading..</div>
        return (

            <section className="note-edit">
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="txtInput" placeholder='edit you note..' value={txtInput} onChange={this.handleChange}  />
                    <button className="edit-note-btn  far fa-save clear-btn"></button>
                </form>
            </section>
        )
    }
}