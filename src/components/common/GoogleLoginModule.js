import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

// Import services
import { importContacts } from '../../services/admin/Contact';

export default class GoogleLoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: props.buttonText,
      disableButton: false
    };
  }

  responseGoogle = response => {
    if (response.error) {
      this.disableButton(false);
    } else {
      this.importGoogleContacts(response.accessToken);
    }
  };

  importGoogleContacts = access_token => {
    var self = this;
    importContacts(access_token)
      .then(function(response) {
        self.props.afterResponse(response);
        self.disableButton(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  disableButton(action = true) {
    const buttonText = action ? 'Loading...' : 'Import google contacts';
    this.setState({ disableButton: action, buttonText: buttonText });
  }

  render() {
    const { disableButton, buttonText } = this.state;
    return (
      <GoogleLogin
        className="pull-right btn btn-orange add-new-btn m-r-10"
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        scope="email https://www.google.com/m8/feeds/"
        disabled={disableButton}
        onRequest={() => this.disableButton(true)}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      >
        <i className="add-album-icon">
          <img
            src={require('../../assets/images/admin/album/add-icon.png')}
            alt=""
          />
        </i>
        {buttonText}
      </GoogleLogin>
    );
  }
}
