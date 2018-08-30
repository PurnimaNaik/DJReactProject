import React, { Component } from 'react';

//importing styles
import style from '../src/style/popup.css';

//importing image
import cancel from '../assets/cancel.svg';


class Popup extends Component {

  onClosePopup() {
    this.props.togglePopup();
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="close">
            <img onClick={this.onClosePopup.bind(this)} src={cancel} />
          </div>
          <div className='popup_container_box'>
            <p>Share with</p>
            <a className="btn btn-primary btn-lg" href="https://www.facebook.com" role="button">Facebook</a>
            <a className="btn btn-info btn-lg" href="https://twitter.com" role="button">Twitter</a>
            <a className="btn btn-success btn-lg" href="#" role="button">WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;