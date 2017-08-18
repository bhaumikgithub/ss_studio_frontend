    import React, { Component } from 'react';
import { Col, Button, Tab,Tabs,TabContainer,TabContent,TabPane,Thumbnail } from 'react-bootstrap';
import AddService from './site-content';

export default class Temp extends Component {
    constructor(props){
        super(props);
        this.state = {
            ServiceShow:false

        } 
    }   

  ServiceClose = () => this.setState({ ServiceShow: false });

  render() {
    
    return (
      <Col xs={12} className=""> 
         <AddService ServiceShow={this.state.ServiceShow} ServiceCloseModal={this.ServiceClose}/> 

         <Button className="btn btn-orange pull-right add-new-service" onClick={()=>this.setState({ ServiceShow: true })}> click </Button>
                      
      </Col>
    );
  }
}
