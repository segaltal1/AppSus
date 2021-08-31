import { NoteImg } from "./note-img.jsx";
import { NoteText } from "./note-text.jsx";
import { NoteVideo } from "./note-video.jsx";
import { NoteTodo } from "./noto-todo.jsx";

export class NotePreview extends React.Component {

    state = {
        note: null,
        currNoteType: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note, currNoteType: note.type })
    }

    render() {
        const{loadNotes} = this.props
        const { note, currNoteType } = this.state
        if (!note) return <div>loading..</div>
        const DynamicCmp = (props) => {
            switch (currNoteType) {
                case 'note-txt':
                    return <NoteText {...props} />
                case 'note-img':
                    return <NoteImg {...props} />
                case 'note-video':
                    return <NoteVideo {...props} />
                case 'note-todo':
                    return <NoteTodo {...props} />
                default:
                    return <div>No Notes</div>
            }
        }
        return (
             <section>
                <DynamicCmp note={note} loadNotes={loadNotes} />
            </section>
        )
    }

}








