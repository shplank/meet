import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.backgroundColor = null;
    this.border = null;
    this.borderRadius = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.color,
      border: this.border,
      borderRadius: this.borderRadius
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
    this.backgroundColor = 'white';
    this.border = 'none';
    this.borderRadius = '4px';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.backgroundColor = 'white';
    this.border = 'none';
    this.borderRadius = '4px';
  }
}

export { InfoAlert, ErrorAlert };
