import React, { Component } from 'react';
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Gamelist from './components/Gamelist';
import Displaygame from './components/Displaygame';
import Standings from './components/Standings';
import Player from './components/Player';
import ball from './img/ball.jpg';
import logo from './img/logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="App">
        <Router basename="/react-mlb">
          <div>
            <Route exact path='/' render={(props) => <Header {...props} logo={logo} />} />
            <Route exact path='/' render={(props) => <Gamelist {...props} ball={ball} />} />
            <Route exact path='/game/:id' render={(props) => <Displaygame {...props} ball={ball} /> } />
            <Route exact path='/standings' render={(props) => <Standings {...props} ball={ball}/> }/>
            <Route exact path='/player/:id' render={(props) => <Player {...props} ball={ball}/> }/>
          </div>
      </Router>
      </div>
    );
  }
}

export default App;