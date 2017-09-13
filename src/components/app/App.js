import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-loading-bar/dist/index.css';

// import routes file
import Routes from '../routes/Routes';

window.paginationPerPage = 5;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={process.env.REACT_APP_BASE_PATH}>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
