import { ColorPalette } from "./ColorPalette.jsx";
import { NoteSetup } from "./note-setup.jsx";

export class NoteText extends React.Component {

    state = {
        text: '',
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
        const { txt, title } = this.props.note.info
        const color = this.props.note.style.backgroundColor
        const { isHover } = this.state
        // if(!txt) return<div></div>
        return (

            <section className={`note-text flex ${note.isPinned ? 'pinned' : ''} `}
                onMouseEnter={this.onHover} onMouseLeave={this.onExitHover} style={{ backgroundColor: color }}>
                {note.isPinned && <img src="./././img/pinned.png" />}
                <h1>{title} </h1>
                <h3>{txt} </h3>
                <div className="note-hover" style={{ opacity: isHover ? '1' : '0' }}>
                    {<NoteSetup note={note} onExitHover={this.onExitHover} loadNotes={loadNotes} />}
                </div>
            </section>
        )

    }
}