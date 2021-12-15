import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Main from './components/Main';
import Sub from './components/Todo/Sub';
import Materials from './components/Matt';
function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/main" component={Main} />
      <Route path="/material" component={Materials} />
      <Route path="/todo" component={Sub} />
      </Switch>
  </div>
  </Router>
  );

}

const Home = () => (  <div>
    <h1>Home Page</h1>
    </div>
)
export default App;
