import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import routes file
import Routes from '../routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
