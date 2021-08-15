import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Detail } from './components/Detail'
import { Login } from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
