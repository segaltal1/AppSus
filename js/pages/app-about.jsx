export function About() {
    return (
        <main className="about-main flex">
            <h1>Our Team</h1>
            <div className="cards-container flex">

                <div className="person-card flex">
                    <h3>Tal Segal</h3>
                    <img src="././img/profile-img/tal.jpg" />
                    <p>22 years old from Pardes-Hana,Israel.
                        Loving to design new things and create and build web-application.
                        studying web development in Coding-Academy.</p>
                </div>
                <div className="person-card flex">
                    <h3>Ido  Elgarisi</h3>
                    <img src="././img/profile-img/ido.jpg" />
                    <p>26 years old from Jerusalem,Israel.
                        Loving to design new things and create and build web-application.
                        studying web development in Coding-Academy.</p>
                </div>

            </div>
        </main>
    )
}