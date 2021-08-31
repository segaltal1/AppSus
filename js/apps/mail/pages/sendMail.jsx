import { emailService } from "../services/email.service.js"


export class SendEmail extends React.Component {
    loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }

    state = {
        id: `${emailService.makeId()}`,
        user: `${this.loggedinUser.fullname}`,
        subject: '',
        body: '',
        isStared: false,
        sentAt: ``,
        to: '',
        from: `${this.loggedinUser.email}`,
        status: 'drafts',
        labels: []
    }
    draftMail = this.state
    inputRef = React.createRef()
    componentDidMount() {
        this.inputRef.current.focus()
        this.interval = setInterval(() => {
            this.draftMail = this.state;

        }, 5000)

    }
    componentWillUnmount() {
        if (this.state.status === 'sent') clearInterval(this.interval)
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }
    onBack = () => {
        this.draftMail.sentAt = Date.now()
        if (!this.draftMail) {
            this.props.history.push(`/emailApp`)
        } else setTimeout(() => {
            emailService.addMail(this.draftMail)
                .then(() => {
                    this.props.loadMail
                    this.props.history.push(`/emailApp`);
                })

        }, 100);

    }
    formSubmited = (ev) => {

        const id = this.state.id
        ev.preventDefault()
        if (this.state.subject === '') this.setState(prevState => ({ ...prevState, subject: '(No Subject...)' }))
        this.setState(prevState => ({ ...prevState, sentAt: Date.now(), status: 'sent' }))
        setTimeout(() => {
            emailService.addMail(this.state)
                .then(() => {
                    this.props.loadMail
                    this.props.history.push(`/emailApp`);
                })

        }, 100);
    }
  
    render() {
        return <section className=" new-mail flex">
            <main className="new-mail-layout">
                <section className="new-mail-display">
                    <header className="mail-header flex"><h4>New Message</h4> <i onClick={this.onBack} className="fa fa-times"></i></header>
                    <div className="from-container">
                        <p> <span>From :</span>{this.loggedinUser.email}</p>
                    </div>
                    <form action="sendMail">
                        <div className="input-group">
                            <input type="text" ref={this.inputRef} autoComplete="off" name="to" placeholder="To..." onChange={this.handleChange} />
                        </div>
                        <div className="input-group">
                            <input type="text" name="subject" autoComplete="off" placeholder="Subject..." onChange={this.handleChange} />
                        </div>
                        <div className="input-group">
                            <textarea name="body" className="body-area" rows="6" placeholder="Body..." onChange={this.handleChange}></textarea>
                        </div>
                        {/* here wil be link to notes */}
                        <div className="send-area-container">
                           <button><i className="fa fa-paperclip" aria-hidden="true"></i></button>
                            <button className="send-btn" onClick={this.formSubmited}>Send </button>

                        </div>
                    </form>
                </section>
            </main>
        </section>
    }
}
