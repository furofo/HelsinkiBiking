import React, { Component } from 'react';

export class Test2 extends Component {
  static displayName = "Test2"

  constructor(props) {
    super(props);
  }

  
  render() {
 

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
       
      </div>
    );
  }

}
