// import { NotesList } from "../cmps/note-list.jsx";
import { utilService } from "../../../services/util.service.js";
import { keepService } from "../services/keepService.js";

export class AddNote extends React.Component {

    state = {
        txtInput: '',
        noteType: 'note-txt'

    }

    componentDidMount() {
        // const notes = this.loadNotes()
        // this.setState({ notes })
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ txtInput: value })
    }

    onSelectType = (noteType) => {
        this.setState({ noteType })
    }

    onAddNote = (ev) => {
        ev.preventDefault()
        const { loadNotes } = this.props
        const { noteType, txtInput } = this.state
        const newNote = {}
        if (noteType === 'note-txt') {
            newNote.type = noteType
            newNote.isPinned = false
            newNote.info = { title: 'My Text', txt: txtInput }
            newNote.style = { backgroundColor: 'lightblue' }
            keepService.addNote(newNote)
                .then(() => {
                    debugger
                    loadNotes()
                });

        }


        else if (noteType === 'note-img') {
            newNote.type = noteType
            newNote.isPinned = false
            newNote.info = { title: 'My Image', url: txtInput }
            newNote.style = { backgroundColor: 'lightblue' }
            keepService.addNote(newNote)
                .then(() => loadNotes());
        }
        else if (noteType === 'note-video') {
            newNote.type = noteType
            newNote.isPinned = false
            const urlId = this.getYoutubeId(txtInput)
            newNote.info = { title: 'My Video', youtubeId: urlId }
            newNote.style = { backgroundColor: 'lightblue' }
            keepService.addNote(newNote)
                .then(() => loadNotes());
        }
        else if (noteType === 'note-todo') {
            newNote.type = noteType
            newNote.isPinned = false
            const todos = txtInput.split(',')
            const allTodos = todos.map((todo) => {
                return { id: utilService.makeId(), isDone: false, txt: todo.trim() }
            })
            newNote.info = { title: 'My todo', todos: allTodos }
            newNote.style = { backgroundColor: 'lightblue' }
            keepService.addNote(newNote)
                .then(() => loadNotes());
        }

        this.setState({ txtInput: '' })
    }
    getPlaceHolder = () => {
        const { noteType } = this.state
        switch (noteType) {
            case 'note-txt':
                return 'Enter Text'
            case 'note-img':
                return 'Enter Img Url'
            case 'note-video':
                return 'Enter Youtube Url'
            case 'note-todo':
                return 'Enter Todos sepreate ,'
            default:
                return ''
        }

    }

    getYoutubeId = (videoUrl) => {
        // let videoUrl = url
        let url = new URL(videoUrl);
        let params = new URLSearchParams(url.search);
        const videoId = params.get("v");
        return videoId
        console.log(videoId);
        // let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        // return embedUrl
    }

    render() {
        const { txtInput, noteType } = this.state
        const { loadNotes } = this.props
        // if (!notes) return <div>loading..</div>
        return (
            <section>
                <div className="add-note">
                    <form onSubmit={this.onAddNote}>
                        <label htmlFor="add-note"></label>
                        <input type="text" name="txtInput" placeholder={this.getPlaceHolder()} value={txtInput} id="add-note" onChange={this.handleChange} autoFocus />
                        <button className="add-note-btn fa fa-far fa-plus-square"></button>
                    </form>
                    <div className="note-type-container">
                        <button onClick={() => this.onSelectType('note-txt')} className={`fa fas fa-font ${noteType === 'note-txt' ? 'active-type' : ''} `}></button>
                        <button onClick={() => this.onSelectType('note-img')} className={`fa fas fa-image ${noteType === 'note-img' ? 'active-type' : ''} `} ></button>
                        <button onClick={() => this.onSelectType('note-video')} className={`fa fas fa-youtube ${noteType === 'note-video' ? 'active-type' : ''} `} ></button>
                        <button onClick={() => this.onSelectType('note-todo')} className={`fa fas fa-list-ul ${noteType === 'note-todo' ? 'active-type' : ''} `} ></button>

                    </div>
                </div>
            </section>
        )
    }

}






