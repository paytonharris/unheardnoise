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
      <div style={this.state.videoPlaying ? 
        { ...styles.background, backgroundImage: `linear-gradient(139.46deg, #EE7171 18.55%, #7176EE 100%)`, transition: '.5s', transitionProperty: 'backgroundImage' } : 
          styles.background}>
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
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '48px',
    transition: '.3s',
    letterSpacing: '14px',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    transition: '.5s',
    backgroundImage: `linear-gradient(139.46deg, #FFFFFF 18.55%, #FFFFFF 100%)`,
    transitionProperty: 'backgroundImage'
  }
}