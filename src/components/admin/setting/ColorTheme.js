import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import React, { Component } from 'react';
import { Col,ListGroup,ListGroupItem,Button } from 'react-bootstrap';
// Import services
import {
  ThemeService,
} from '../../../services/Index';
export default class ColorTheme extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      themeColors: {}
    };

    return initialState;
  }

  componentWillMount() {
    var self = this;
    ThemeService.getTheme().then(function(response) {
      if (response.status === 200) {
        self.setState({
          themeColors: response.data.data.theme.color_theme
        });
      }
    })
    .catch(function(error) {
        console.log(error);
    });;
  }

  handleChangeComplete = (color,val) => {
    const themeColors = this.state.themeColors;
    themeColors[val]=color.currentValue 
    console.log(val,color)
    this.setState({
      themeColors
    });
  };

  handleSubmit(e) {
    var self = this;
    var { themeColors } = self.state;
    var editParams = {
      theme: themeColors
    };
    ThemeService.updateTheme(editParams)
      .then(function(response) {
        console.log("success.....",response);
      })
      .catch(function(error) {
          console.log(error.response);
      });
  }

  render() {
    const { themeColors } = this.state;
    debugger;
    return (
      <Col>
        <Col>
          Color
        </Col>
        <br/>
        {themeColors &&
        <div>
          <Col>
            Links
            <ListGroup>
              <ListGroupItem className="borderless">
                <Col xs={2}>Header Links</Col>
                <ColorPickerComponent value={themeColors && themeColors["header_links"] && themeColors["header_links"]["hex"] ? themeColors["header_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'header_links')} />
              </ListGroupItem>
              <ListGroupItem className="borderless">
                <Col xs={2}>Normal Links</Col>
                <ColorPickerComponent value={themeColors && themeColors["normal_links"] && themeColors["normal_links"]["hex"] ? themeColors["normal_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"normal_links")} />
              </ListGroupItem>
              <ListGroupItem className="borderless">
                <Col xs={2}>Footer Links</Col>
                <ColorPickerComponent value={themeColors && themeColors["footer_links"] && themeColors["footer_links"]["hex"] ? themeColors["footer_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"footer_links")} />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            Content
            <ListGroup>
              <ListGroupItem className="borderless">
                <Col xs={2}>Title Color</Col>
                <ColorPickerComponent value={themeColors && themeColors["title_color"] && themeColors["title_color"]["hex"] ? themeColors["title_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'title_color')} />
              </ListGroupItem>
              <ListGroupItem className="borderless">
                <Col xs={2}>Normal Text Color</Col>
                <ColorPickerComponent value={themeColors && themeColors["normal_text_color"] && themeColors["normal_text_color"]["hex"] ? themeColors["normal_text_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"normal_text_color")} />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            Background
            <ListGroup>
              <ListGroupItem className="borderless">
                <Col xs={2}>Header Background</Col>
                <ColorPickerComponent value={themeColors && themeColors["header_background"] && themeColors["header_background"]["hex"] ? themeColors["header_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'header_background')} />
              </ListGroupItem>
              <ListGroupItem className="borderless">
                <Col xs={2}>Body Background</Col>
                <ColorPickerComponent value={themeColors && themeColors["body_background"] && themeColors["body_background"]["hex"] ? themeColors["body_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"body_background")} />
              </ListGroupItem>
              <ListGroupItem className="borderless">
                <Col xs={2}>Footer Background</Col>
                <ColorPickerComponent value={themeColors && themeColors["footer_background"] && themeColors["footer_background"]["hex"] ? themeColors["footer_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"footer_background")} />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            Others
            <ListGroup>
              <ListGroupItem className="borderless">
                <Col xs={2}>Bullet / Icon Colors</Col>
                <ColorPickerComponent value={themeColors && themeColors["bullet_icon_color"] && themeColors["bullet_icon_color"]["hex"] ? themeColors["bullet_icon_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'bullet_icon_color')} />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Button
            className="btn btn-orange edit-about-submit"
            onClick={event => this.handleSubmit(event)}
          >
            Save
          </Button>
        </div>
        }
      </Col>
    );
  }
}