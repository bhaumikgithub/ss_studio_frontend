import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import routes file
import Routes from '../routes/Routes';
// import layout file
import Layout from '../layout/Layout';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Layout>
              <Routes />
            </Layout>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
