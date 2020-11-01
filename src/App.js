import React, { Component } from 'react';
import DiamondButton from './components/DiamondButton';

export default class App extends Component {
  state = {
    videoPlaying: null // becomes a youtube link
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <p className="blackBackground" style={styles.title}>
          UNHEARD NOISE
        </p>
        <DiamondButton onClick={() => this.setState({ videoPlaying: 'some link...' })}>
          {this.state.videoPlaying ? 'Discover More' : 'Discover'}
        </DiamondButton>
      </div>
    );
  }
};

let styles = {
  title: {
    color: 'black',
    borderRadius: '5px',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '48px',
    transition: '.3s'
  }
}