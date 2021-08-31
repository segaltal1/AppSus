const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { KeepApp } from './js/apps/keep/pages/Keep.jsx'
import { EmailApp } from './js/apps/mail//pages/emailApp.jsx'
import { AppHeader } from './js/cmps/AppHeader.jsx'
import { Home } from './js/pages/Home.jsx';
import {BookApp} from './js/apps/book/pages/BookApp.jsx'
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx'
import {AddReview} from './js/apps/book/pages/ReviewAdd.jsx'



export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
        <Route path="/book/:bookId/review" component={AddReview} />
          <Route path="/book/:bookId" component={BookDetails} />
          <Route path="/book" component={BookApp} />
          <Route path="/keepApp/:mailId" component={KeepApp} />
          <Route path="/emailApp/:noteId" component={EmailApp} />
          <Route path="/emailApp" component={EmailApp} />
          <Route path="/keepApp" component={KeepApp} />
          <Route path="/bookApp" component={BookApp} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </Router>
  );
}
