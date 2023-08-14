import React, { Component } from 'react';

export class Test1 extends Component {
  static displayName = "Test1";

  constructor(props) {
    super(props);
  
  }



  render() {
    return (
      <div>
        <h1>Test1</h1>

        <p>This is a simple example of a React component.</p>

      </div>
    );
  }
}
