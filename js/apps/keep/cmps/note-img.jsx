import { NoteSetup } from "./note-setup.jsx"





export class NoteImg extends React.Component {

    state = {
        isHover: false
    }

    onHover = (ev) => {
        this.setState({ isHover: true })
    }
    onExitHover = (ev) => {
        this.setState({ isHover: false })
    }

    render() {
        const { note, loadNotes } = this.props
        const { url, title } = this.props.note.info
        const { isHover } = this.state
        const color = this.props.note.style.backgroundColor
        // const { title } = this.props.note
        if (!url) return <div>loding..</div>
        return (
            <section className={`image-container ${note.isPinned ? 'pinned' : ''} `}
                onMouseEnter={this.onHover} onMouseLeave={this.onExitHover} style={{ backgroundColor: color }} >
                {note.isPinned && <img src="./././img/pinned.png" />}
                <h1>{title}</h1>
                <img
                    className="note-img"
                    src={url}
                />
                <div className="note-hover" style={{ opacity: isHover ? '1' : '0' }}>
                    {<NoteSetup note={note} onExitHover={this.onExitHover} loadNotes={loadNotes} />}
                </div>
            </section>
        )
    }

}
