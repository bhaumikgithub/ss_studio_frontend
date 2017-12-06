import React, { Component } from 'react';
import { Col, Tab, Tabs, Checkbox } from 'react-bootstrap';
// Import component

// Import services
import { WatermarkService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/site-content/site-content.css';
import '../../../assets/css/contact/services.css';

export default class SiteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watermarks: [],
      tab: 'watermark'
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  componentWillMount() {
    var self = this;
    WatermarkService.getWatermark().then(function(response) {
      if (response.status === 200) {
        self.setState({
          watermarks: response.data.data.watermarks
        });
      }
    });
  }

  handleTabSelect(key) {
    this.setState({ tab: key });
  }

  handleWatermarkModel(event, id) {
    var status = 'active';
    if (event.target.checked) {
      status = 'active';
    } else {
      status = 'inactive';
    }

    var editParams = {
      id: id,
      watermarks: { status: status }
    };
    WatermarkService.updateWatermark(editParams)
      .then(function(response) {
        var responseData = response.data;
        if (response.status === 201) {
          console.log(responseData);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }
  render() {
    const { tab, watermarks } = this.state;
    return (
      <Col xs={12} className="site-content-wrap">
        <Tabs
          defaultActiveKey={tab}
          onSelect={this.handleTabSelect}
          id="uncontrolled-tab-example"
          className="site-content-tabs"
        >
          <Tab
            eventKey="watermark"
            title="Watermark"
            className="about-site-content"
          >
            <Col xs={12} className="site-content-filter p-none" />
            {watermarks &&
              watermarks.map((watermark, index) => (
                <Col xs={12} className="p-none" key={index}>
                  <Col className="content-about-img-wrap watermark-content-img">
                    {watermark.photo && (
                      <img
                        className="img-responsive content-user-image"
                        src={watermark.photo.image}
                        alt="user"
                      />
                    )}
                  </Col>
                  <Col className="right-content-wrap text-grey">
                    <Col xs={12} className="about-content-wrap">
                      <Checkbox
                        name="active-checkbox"
                        className=" album-status-checkboxes"
                        defaultChecked={
                          watermark.status === 'active' ? true : false
                        }
                        onClick={event =>
                          this.handleWatermarkModel(event, watermark.id)}
                      >
                        Add watermark while uploading photos
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </Col>
                  </Col>
                </Col>
              ))}
          </Tab>
        </Tabs>
      </Col>
    );
  }
}
