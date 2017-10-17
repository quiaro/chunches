import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/dialog.css';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('dialog');
    document.body.appendChild(this.overlayContainer);
    this.overlayContainer.showModal();
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="content">
        <button onClick={this.props.onClose}>x</button>
        {this.props.children}
      </div>,
      this.overlayContainer
    );
  }
}

export default Dialog;
