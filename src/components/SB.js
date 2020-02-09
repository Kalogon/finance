import React, { Component } from 'react';

class SB extends Component{
    constructor(props){
        super(props);
    }

    render(){
      const tempStyle={
        display:"inline-block",
        float:"right",
        backgroundColor:"lightgray",
        width:"20%",
      }
      return(
        <span className="sidebar" role="presentation" style={tempStyle} >
          <ul>
            <p></p>
            <p align="center">My page</p>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>
            <li>Menu Item 3</li>

          </ul>
        </span>
      );
    }
  }
  export default SB;