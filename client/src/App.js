import { Fragment } from 'react';
import "../src/styles/index.css"
import Header from './components/Header';
import Home from './components/Home';
import ContactList from './components/ContactList';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SendMessage from './components/SendMessage';
import MessageHistory from './components/MessageHistory';


function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>

        <Route path="/history">
            <MessageHistory />
          </Route>

          <Route path="/contacts/:id" children={<ContactDetail />} />

          <Route path="/contact">
            <ContactList />
          </Route>

          <Route path="/create" >
            <ContactForm />
          </Route>

          <Route exact path="/sendmessage/:id" >
            <SendMessage />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>


        </Switch>
        <Footer />
      </Router>
    </Fragment>
  )
}

export default App;

