import { EmailPreview } from './emailPreview.jsx'
export function EmailList({ mails, onDeleteMail, onReadBtn, onChangeMode }) {
    return (
        <table className="email-list">
            <thead>
                <tr className="emails-info-line">
                
                </tr>
            </thead>
            <tbody className="mails-list-container">
                {mails.map(mail => <EmailPreview onChangeMode={onChangeMode} onReadBtn={onReadBtn} key={mail.id} mail={mail} onDeleteMail={onDeleteMail} />)}
            </tbody>
        </table>
    )
}
