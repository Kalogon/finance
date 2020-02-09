import React, { Component, Image } from 'react';
import logo from './hmhmh.png'

class Chart extends Component{
    
    render(){
        const Style={
            display:"inline-block",
            width:"20%",
            height:"20%"
        }
      return(
          <span sytle={Style}>
            <img src={logo} alt={'logo'}></img>
          </span>
      );
    }
  }

  export default Chart;