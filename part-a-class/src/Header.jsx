import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setState({ time: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Sổ Chi Tiêu Cá Nhân</h2>
        <p>Thời gian: {this.state.time.toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default Header;