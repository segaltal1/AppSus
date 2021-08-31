const { NavLink, Route, Switch } = ReactRouterDOM
import { EmailList } from '../cmps/emailList.jsx';
import { EmailSort } from '../cmps/emailSort.jsx';
import { emailService } from '../services/email.service.js'
import { EmailNav } from '../cmps/emailSideNav.jsx';
import { EmailFilter } from '../cmps/emailFilter.jsx';
import { SendEmail } from '../pages/sendMail.jsx'
import { EmailDetails } from './emailDetails.jsx';
import { keepService } from '../../keep/services/keepService.js';
export class EmailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
        selectedEmail: null,

    };

    componentDidMount() {

        this.loadEmails();
        this.onSetSort('newest')
        const { noteId } = this.props.match.params
        if (noteId) {
            (keepService.getNoteById(noteId))
                .then((note) => { this.makeNoteMail(note) })
            // .then((res) => this.addMailToNotes(res))
        }

    }
    getnoteBody(note) {

        if (note.type === 'note-txt') return note.info.txt
        if (note.type === 'note-todo') return note.info.todos.map((todo) => todo.txt)
        if (note.type === 'note-video') {
            return (<iframe width="100%" height="200px"
                src={`https://www.youtube.com/embed/${note.info.youtubeId}`}>
            </iframe>)
        }
        if (note.type === 'note-img') {
            return (<img height="300px" src={note.info.url} />)
        }


    }
    makeNoteMail(note) {
        const { title } = note.info
        console.log(note);
        // let bodyData = (note.type === 'note-txt') ? Object.values(note.info)[0] : note.info[1]
        const body = this.getnoteBody(note)
        const mailNote = {
            id: emailService.makeId(),
            subject: title,
            body: body,
            isRead: false,
            isStared: false,
            sentAt: Date.now(),
            to: ' ',
            from: title,
            fromName: 'Keep App',
            status: 'inbox',
            color: 'indigo',
            labels: []
        }
        emailService.addMail(mailNote)
            .then(() => {
                this.loadEmails()
                this.onSetSort('newest')
                this.props.history.push('/emailApp')
            })
    }
    loadEmails = () => {
        this.setState({ selectedEmail: null })
        emailService.query(this.state.filterBy).then((mails) => {
            this.setState({ mails })
        });
    };
    onSetFilter = (filterBy) => {
        if (this.props.history.location !== '/emailApp') this.props.history.push('/emailApp')
        this.setState({ filterBy }, this.loadEmails);
    };
    onSetSort = (sortBy) => {
        emailService.sortMails(sortBy)
            .then(this.loadEmails)
    }

    onDeleteMail = (id) => {
        emailService.deleteMail(id)
            .then(this.loadEmails)
    }
    onNewEmail = () => {
        const { isSendEmail } = this.state
        this.setState({ isSendEmail: !isSendEmail })
    }
    onChangeMode = (id, mode) => {
        emailService.changeMode(id, mode)
            .then(this.loadEmails)
    }


    loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    render() {
        const { mails, selectedEmail } = this.state;
        return (
            <section className="mails-layout"  >
                {/* <div className="screen" ></div> */}
                <section className="mails-layout" >
                    <div className="nav-search-conatiner flex">
                        <section className="nav-show">
                            <NavLink to="/emailApp/newMail" className="new-mail-btn flex " onClick={() => { this.setState({ active: null, selectedEmail: true }) }} ><div className="add-img"></div> <p>New Mail</p></NavLink>
                            <nav className="main-nav-side "><EmailNav mails={mails} onNewEmail={this.onNewEmail} loadEmails={this.loadEmails} onSetFilter={this.onSetFilter} /></nav>
                        </section>
                        <header className=" email-header flex " >
                            <section className="mails-list-header flex ">
                                <div className="flex m-image">
                                    <img src="././././img/m-icon.png" />
                                    <h1>Ail</h1>
                                </div>
                                <div className="filter-sort-container">
                                    <EmailFilter onSetFilter={this.onSetFilter} />
                                    <EmailSort onSetSort={this.onSetSort} />

                                </div>
                                <div className="user-icon"><p>{this.loggedinUser.fullname.charAt(0).toUpperCase()}</p></div>
                            </section>
                        </header>

                    </div>
                    {/* <section className="mails-layout flex"> */}
                    <main className="mails-main-layout flex" >
                        <EmailList onChangeMode={this.onChangeMode} mails={mails} onReadBtn={this.onReadBtn} onDeleteMail={this.onDeleteMail} />
                        <Switch>

                            <Route path="/emailApp/newMail" loadEmails={this.loadEmails} component={SendEmail} />
                            <Route path="/emailApp/:mailId" component={EmailDetails} />
                        </Switch>
                    </main>

                    {/* </section> */}
                </section >
            </section >

        )
    }
}