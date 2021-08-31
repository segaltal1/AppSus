const { NavLink, withRouter } = ReactRouterDOM
class _AppHeader extends React.Component {

    state = {
        isNavOpen: false
    }

    toggleNav = () => {
        const { isNavOpen } = this.state
        this.setState({ isNavOpen: !isNavOpen })
    }
    render() {
        const { isNavOpen } = this.state
        // if (!isNaveOpen) return <div>laoding..</div>
        return (
            <section className="app-header">
                <h1 className="logo" ><NavLink exact to="/">AppSus</NavLink></h1>
                <button onClick={this.toggleNav} className="clear-btn collection-btn">  <img src='img\collection.png' /> </button>
                <ul className={`main-nav-bar ${isNavOpen ? 'open-nav' : 'close-nav'}`}>
                    <li  > <NavLink exact to="/"><img onClick={() => this.setState({ isNavOpen: false })} src='img\home-logo.png' /></NavLink></li>
                    <li ><NavLink to="/bookApp"><img onClick={() => this.setState({ isNavOpen: false })} src='img\books-logo.png' /></NavLink></li>
                    <li ><NavLink to="/keepApp"><img onClick={() => this.setState({ isNavOpen: false })} src='img\keep-logo.png' /></NavLink></li>
                    <li ><NavLink to="/emailApp"><img onClick={() => this.setState({ isNavOpen: false })} src='img\mail-logo.png' /></NavLink></li>
                    {/* <li onClick={() => this.setState({ isNavOpen: false })} ><NavLink to="/about">About</NavLink></li> */}
                </ul>

            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader);

