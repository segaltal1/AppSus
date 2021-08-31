import { emailService } from "../../mail/services/email.service.js";
import { AddNote } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NotesList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keepService.js";
export class KeepApp extends React.Component {

    state = {
        notes: null,
        filterBy: null
    }

    componentDidMount() {
        const { mailId } = this.props.match.params
        if (mailId) {
            (emailService.getMailById(mailId))
                .then((res) => {
                    console.log(res);
                    this.addMailToNotes(res)
                })
        }
        this.loadNotes();
    }

    waitUntil() { 
        
    }
    loadNotes = () => {
        keepService.query(this.state.filterBy)
            .then((notes) => {
                this.setState({ notes });
            });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    addMailToNotes = (mail) => {
        console.log(mail);
        let { body, subject } = mail
        if (!body) body = 'Empty Body'
        if (!subject) subject = 'My Email'
        const newNote = {}
        newNote.type = 'note-txt'
        newNote.isPinned = false
        newNote.info = { title: subject, txt: body }
        newNote.style = { backgroundColor: 'lightblue' }
        keepService.addNote(newNote)
            .then(() => console.log('saved'))
    }


    render() {
        const { notes } = this.state
        if (!notes) return <div>loading..</div>

        return (
            <section className="main-keep">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <AddNote loadNotes={this.loadNotes} />
                <NotesList notes={notes} loadNotes={this.loadNotes} />
                {(notes.length === 0) &&
                    <div className="no-result">
                        <h1 className="no-result-title">No Matching Results..</h1>
                        <img className="no-result-img" src="../../../../img/no-results.jpg" />
                    </div>
                }
            </section>
        )
    }

}






