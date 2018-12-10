import React, { Component } from 'react';
import Filter from './components/Filter';
import List from './components/List';
import Map from './Map';
import './css/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = { menuOpen:false}; //initialized the state of menu to false
    this.map = new Map()
  }
  render() {
    return (
      <div className="container">
        <img onClick={()=>this.toggleMenu()} id="menu" src="/menuIcon.png" alt="Hamburger Menu" />
        <h1>Bay Area Aquaparks</h1>
        <nav id="drawer" className={this.state.menuOpen ? 'open' : ''}>
          <Filter />
          <List ref={list => {
            this.map.setList(list);
          }} />
        </nav>
        <div id="map"></div>

      </div>
    );
  }
  toggleMenu() {
    this.setState({menuOpen: !this.state.open });
  }
}

export default App;
