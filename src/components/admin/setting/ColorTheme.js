import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import React, { Component } from 'react';
import { Col,Button,Row } from 'react-bootstrap';
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

  handleResetTheme = () => {
    var self = this
    var editParams = {
      resetTheme: true
    };
    ThemeService.updateTheme(editParams)
      .then(function(response) {
        if(response.status === 201){
          self.setState({
            themeColors: response.data.data.theme.color_theme
          });
        }
      })
      .catch(function(error) {
          console.log(error.response);
      });
  }

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
    return (
      <Col>
        <Col xs={6} className="site-content-filter p-none pull-right">
          <Button
            className="btn btn-orange pull-right"
            onClick={this.handleResetTheme}
          >
            Reset Theme
          </Button>
        </Col>
        <Col>
          <b>Colors</b>
        </Col>
        <br/>
        {themeColors &&
        <div>
          <Row>
            <Col xs={12}>
              Links
            </Col>
            <Col xs={3}>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Header Links</div>
                <ColorPickerComponent className="colorpicker" value={themeColors && themeColors["header_links"] && themeColors["header_links"]["hex"] ? themeColors["header_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'header_links')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Normal Links</div>
                  <ColorPickerComponent value={themeColors && themeColors["normal_links"] && themeColors["normal_links"]["hex"] ? themeColors["normal_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"normal_links")} />
              </div>
              <div className="borderless list-group-item">
              <div className="color-picker-title">Footer Links</div>
                <ColorPickerComponent value={themeColors && themeColors["footer_links"] && themeColors["footer_links"]["hex"] ? themeColors["footer_links"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"footer_links")} />
              </div>
            </Col>
            <Col xs={3}>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Hover Header Link</div>
                <ColorPickerComponent value={themeColors && themeColors["hover_header_link"] && themeColors["hover_header_link"]["hex"] ? themeColors["hover_header_link"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'hover_header_link')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Active Header Link</div>
                <ColorPickerComponent value={themeColors && themeColors["active_header_link"] && themeColors["active_header_link"]["hex"] ? themeColors["active_header_link"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"active_header_link")} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Hover Normal Link</div>
                <ColorPickerComponent value={themeColors && themeColors["hover_normal_link"] && themeColors["hover_normal_link"]["hex"] ? themeColors["hover_normal_link"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'hover_normal_link')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Active Normal Link</div>
                <ColorPickerComponent value={themeColors && themeColors["active_normal_link"] && themeColors["active_normal_link"]["hex"] ? themeColors["active_normal_link"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"active_normal_link")} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              Content
            </Col>
            <Col xs={3}>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Header Title Color</div>
                <ColorPickerComponent value={themeColors && themeColors["header_title_color"] && themeColors["header_title_color"]["hex"] ? themeColors["header_title_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'header_title_color')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Title Color</div>
                <ColorPickerComponent value={themeColors && themeColors["title_color"] && themeColors["title_color"]["hex"] ? themeColors["title_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'title_color')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Normal Text Color</div>
                <ColorPickerComponent value={themeColors && themeColors["normal_text_color"] && themeColors["normal_text_color"]["hex"] ? themeColors["normal_text_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"normal_text_color")} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              Background
            </Col>
            <Col xs={3}>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Header Background</div>
                <ColorPickerComponent value={themeColors && themeColors["header_background"] && themeColors["header_background"]["hex"] ? themeColors["header_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'header_background')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Body Background</div>
                <ColorPickerComponent value={themeColors && themeColors["body_background"] && themeColors["body_background"]["hex"] ? themeColors["body_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"body_background")} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Footer Background</div>
                <ColorPickerComponent value={themeColors && themeColors["footer_background"] && themeColors["footer_background"]["hex"] ? themeColors["footer_background"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,"footer_background")} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              Others
            </Col>
            <Col xs={3}>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Bullet / Icon Colors</div>
                <ColorPickerComponent value={themeColors && themeColors["bullet_icon_color"] && themeColors["bullet_icon_color"]["hex"] ? themeColors["bullet_icon_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'bullet_icon_color')} />
              </div>
              <div className="borderless list-group-item">
                <div className="color-picker-title">Image Overlay Font Color</div>
                <ColorPickerComponent value={themeColors && themeColors["image_overlay_font_color"] && themeColors["image_overlay_font_color"]["hex"] ? themeColors["image_overlay_font_color"]["hex"] :  "#000000"} change={event => this.handleChangeComplete(event,'image_overlay_font_color')} />
              </div>
            </Col>
          </Row>
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