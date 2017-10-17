import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '../styles/dialog.css';

const Styled = styled.div`
  position: relative;
  padding-top: 10px;

  > button {
    position: absolute;
    top: -10px;
    right: -10px;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
    background-color: ${props => props.theme.button_background};
    color: ${props => props.theme.button_text};
  }
`;

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
      <Styled>
        <button onClick={this.props.onClose}>x</button>
        {this.props.children}
      </Styled>,
      this.overlayContainer,
    );
  }
}

export default Dialog;
