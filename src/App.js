import React, { Component } from 'react';
import './App.css';
import SB from './components/SB';
import NavBar from './components/NavBar';
import Chart from './components/Chart';


class App extends Component{
  constructor(props){ //초기화 담당
    super(props);
  }
  render(){
    
    return(
      <div className="App">
        <NavBar></NavBar>
        <Chart></Chart>
        <SB></SB>
      </div>
    )
  }
}

export default App;