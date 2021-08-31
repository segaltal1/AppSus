import { About } from "./app-about.jsx"
import { Footer } from "./app-footer.jsx"
import { Main } from "./app-main.jsx"

const { NavLink } = ReactRouterDOM
export function Home() {
    return (
        <main className="home-layout">
            <Main />
            <About />
            <Footer />
            {/* <button><NavLink to="/emailApp">Go To Email</NavLink></button>
        <button><NavLink to="/book">Go To Store</NavLink></button>
        <button><NavLink to="/keepApp">Go To Keep</NavLink></button> */}
        </main>
    )
}