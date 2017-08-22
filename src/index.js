import React from 'react';
import ReactDOM from 'react-dom';

// import css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';
import './assets/css/style.css';
import './assets/css/developer.css';

// import component
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

// import js
import './assets/js/scipt.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
