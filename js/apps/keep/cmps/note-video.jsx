import { NoteSetup } from "./note-setup.jsx"

export class NoteVideo extends React.Component {
    state = {
        loaded: false,
        isHover: false
    }

    onHover = (ev) => {
        this.setState({ isHover: true })
    }
    onExitHover = (ev) => {
        this.setState({ isHover: false })
    }
    render() {
        // const { loaded } = this.state
        const { note, loadNotes } = this.props
        const { isHover } = this.state

        const { youtubeId, title } = this.props.note.info
        const color = this.props.note.style.backgroundColor

        return (
            <section className={`video-note ${note.isPinned ? 'pinned' : ''} `}
                onMouseEnter={this.onHover} onMouseLeave={this.onExitHover} style={{ backgroundColor: color }}>
                {note.isPinned && <img src="./././img/pinned.png" />}
                <h1>{title}</h1>
                <iframe width="100%" height="200px"
                    src={`https://www.youtube.com/embed/${youtubeId}`}>
                </iframe>
                <div className="note-hover" style={{ opacity : isHover ? '1' : '0' }}>
                    {<NoteSetup note={note} onExitHover={this.onExitHover} loadNotes={loadNotes} />}
                </div>
                {/* {isHover && <NoteSetup note={note} onExitHover={this.onExitHover} loadNotes={loadNotes} />} */}
            </section>
        )
    }
}