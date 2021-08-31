import { emailService } from '../services/email.service.js'
import { EmailNav } from '../cmps/emailSideNav.jsx';
const { NavLink } = ReactRouterDOM
export class EmailDetails extends React.Component {
    state = { mail: null }
    componentDidMount() {
        this.loadMail()
        

    }

    loadMail = () => {
        const id = this.props.match.params.mailId
        emailService.getMailById(id)
            .then(mail => {
                if (!mail) return
                mail.isRead = true
                this.setState({ mail: mail })
            })
    }

    onBack = () => {
        this.props.history.push('/emailApp')

    }

    render() {
        const mail = this.state.mail
        if (!mail) return <div>loading..</div>
        const mailSentTime = new Date(mail.sentAt)
        let date = `${mailSentTime.getDate()}.${mailSentTime.getMonth() + 1}.${mailSentTime.getFullYear() + 1}`
        let hours = mailSentTime.getHours() < 10 ? `0${mailSentTime.getHours()}` : mailSentTime.getHours();
        let minutes = mailSentTime.getMinutes() < 10 ? `0${mailSentTime.getMinutes()}` : mailSentTime.getMinutes();
        return <section className="flex">
            <main className="mail-layout">
                <section className="full-mail-display">
                    <header className="mail-header flex"><h4>{mail.subject}</h4> <i onClick={this.onBack} className="fa fa-times"></i></header>
                    <section className="mail-display-info-line flex space-between">
                        <div className="mail-title-line flex space-between">
                            <div className="mail-title-head ">
                                <h4>{mail.subject}</h4>
                            </div>
                            <div className="date-container flex">
                                <p > {`${hours}:${minutes}`}</p>
                                <p>{date}  </p>
                            </div>
                        </div>
                        <div className="from-container">
                            {mail.status === 'sent' ? <p> <span>To :</span>{mail.to}</p> : <p> <span>From:</span>{mail.from}</p>}
                        </div>

                    </section>
                    <div className="msg-container">
                        <p>{mail.body}</p>
                    </div>
                    <div className="btns-container">
                        <NavLink to={`/keepApp/${mail.id}`}><button>Notes</button></NavLink>
                    </div>
                </section>
            </main>
        </section>
    }
}
