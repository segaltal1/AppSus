const { NavLink, withRouter } = ReactRouterDOM

class _EmailNav extends React.Component {
    state = {
        active: false,
        mails: this.props.mails
    }
    componentDidMount() {
        this.setState({ mails: this.props.mails })
    }


    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    onNavClicked(val) {
        const { onSetFilter } = this.props
        onSetFilter(val)
        this.toggleClass()
    }
    getReadCount() {
        const { mails } = this.props
        let mailsCount = mails.length
        let unreadMailsCount = mails.filter((mail) => { return (mail.isRead === false) }).length
        if (mailsCount === 0) return 0
        return (((unreadMailsCount / mailsCount) * 100).toFixed(1))
    }
    render() {
        const { active, mails } = this.state
        return (
            <section className="mail-nav">
                <button onClick={() => this.toggleClass()} className={`btn-menu ${active ? 'active' : ' '}`}><i className="fa fa-bars"></i></button>
                <div className="screen" onClick={() => this.toggleClass()} ></div>
                <ul className="mail-nav-bar">
                    <li className="flex" onClick={() => this.onNavClicked('inbox')}><i className="fa fa-inbox"></i><span>Inbox</span> </li>
                    <li className="flex" onClick={() => this.onNavClicked('isStared')}><i className="fa fa-star"></i><span>Stared</span> </li>
                    <li className="flex" onClick={() => this.onNavClicked('sent')}><i className="fa fa-paper-plane"></i><span>Sent</span> </li>
                    <li className="flex" onClick={() => this.onNavClicked('drafts')}><i className="fa fa-sticky-note"></i> <span>Drafts</span></li>
                    <li className="flex" onClick={() => this.onNavClicked('trash')}><i className="fa fa-trash"></i> <span>Rcycle Bin</span></li>
                    {/* <li className="read-count-container"><div className="read-count" ><p width={`${this.getReadCount()}%`}>{this.getReadCount()} %</p></div> </li> */}
                    <li className="read-count-container"><div className="read-count" style={{ width: `${this.getReadCount()}%` }}><p >{this.getReadCount()}%</p></div> </li>
                </ul>

            </section >
        )
    }
}
export const EmailNav = withRouter(_EmailNav);