const { NavLink, withRouter } = ReactRouterDOM

// import {} from "../../img/mail-home.png"
export function Main() {
    return (
        <main className="home-main flex">
            <section className="home-image">
                <h1>Welcome To Appsus</h1>
            </section>
            <h1 className="cards-title">Manage All Yours Tasks With Us</h1>

            <section className="home-details flex">
                <NavLink to="/emailApp">
                    <div className="icon-card flex">
                        <img src="././img/mail-home.png" />
                        <p>Send emails to friends</p>
                    </div>
                </NavLink>
                <NavLink to="/keepApp">
                    <div className="icon-card flex">
                        <img src="././img/notes-home.png" />
                        <p>Edit your notes with friends </p>
                    </div>
                </NavLink>
                <NavLink to="/bookApp">
                    <div className="icon-card flex">
                        <img src="././img/books-home.png" />
                        <p>Read your favorite Books </p>
                    </div>
                </NavLink>


            </section>
        </main >
    )
}