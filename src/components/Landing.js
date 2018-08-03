import { Component } from 'react';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState(){
    window.location.href = process.env.REACT_APP_LANDING_URL
  }
  
}

export default Landing;