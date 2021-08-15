import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import { Home } from "./components/Home"
import { Error } from "./components/Error"
import { About } from "./components/About"
import { Practice } from "./components/Practice"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-me" component={About} />
        <Route exact path="/practice/:id" component={Practice} />
        <Route component={Error} />
      </Switch>
    </Router>
  )
}

export default App
