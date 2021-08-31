const { NavLink, withRouter } = ReactRouterDOM
class _AppHeader extends React.Component {
    render() {
        return (
            <section className="app-header">
                <h1 ><NavLink exact to="/">Book Store</NavLink></h1>
                <ul className="main-nav-bar">
                    <li> <NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/book">Our Books</NavLink></li>
                </ul>

            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader);