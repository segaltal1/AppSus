const { NavLink } = ReactRouterDOM
import { emailService } from '../services/email.service.js'
export class EmailPreview extends React.Component {
    state = {
        isExpand: true
    }

    showTime(removeTime) {
        const { mail } = this.props
        let mailTime = (removeTime) ? mail.removedAt : mail.sentAt;
        let dateToShow = `${new Date(mailTime).getDate()}.${new Date(mailTime).getMonth()}.${new Date(mailTime).getFullYear()}`
        let hours = new Date(mailTime).getHours() < 10 ? `0${new Date(mailTime).getHours()}` : new Date(mailTime).getHours();
        let minutes = new Date(mailTime).getMinutes() < 10 ? `0${new Date(mailTime).getMinutes()}` : new Date(mailTime).getMinutes();
        if (Date.now() - mailTime < 86400000) dateToShow = `${hours}:${minutes}`
        return dateToShow
    }


    render() {
        const { mail, onDeleteMail, onChangeMode } = this.props
        const { isExpand } = this.state
        // console.log(mail);
        return (
            <tr className="mail-details flex " >
                {/* <td className="mail-icon"></td> */}
                <td className="flex" >
                    <div className="mail-icon" style={{ backgroundColor: mail.color }}><p>{mail.from.charAt(0).toUpperCase()}</p></div>
                    <NavLink to={`/emailApp/${mail.id}`} >
                        <div className="mail-title flex ">
                            <p className={`mail-subject ${mail.isRead ? 'read' : 'unread'} `}>{mail.status === 'sent' ? mail.to : mail.from}</p>
                            <p className="mail-body">{mail.subject.substring(0,25)}...</p>
                        </div>
                    </NavLink>
                </td>
                <td className="mail-info flex space-between"> <p className="mail-date">{this.showTime(mail.removedAt)}</p>
                    <div className="mail-edit-btns flex">
                        <button className="clear-btn" onClick={() => { onDeleteMail(mail.id) }}><i className="fas fa-trash"></i></button>
                        <button className="clear-btn" onClick={() => { onChangeMode(mail.id, 'isRead') }} ><i className={`fa fa-envelope${mail.isRead ? '-open' : ''}`}></i></button>
                        <NavLink to={`/emailApp/${mail.id}`} ><i className="fa fa-expand"></i></NavLink>
                    </div>
                    <div className="mail-star-and-menu flex space-between">
                        <p className="mail-star" ><i onClick={() => { onChangeMode(mail.id, 'isStared') }} className={`${mail.isStared ? 'fas' : 'far'} fa-star`}></i></p>
                        <p ><i className="fas fa-ellipsis-v"></i></p>
                    </div>
                </td>
            </tr>

        )

    }
}