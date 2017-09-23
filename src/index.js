import React from 'react';
import ReactDOM from 'react-dom';

// import css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'sweetalert/dist/sweetalert.css';
import './assets/css/style.css';
// import './assets/css/developer.css';
import './assets/css/nprogress.css';
import 'nprogress/nprogress.js';

// import component
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

// import js
import './assets/js/scipt.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
