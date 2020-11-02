import React, { Component } from 'react';
import DiamondButton from './components/DiamondButton';
import ReactPlayer from 'react-player'

export default class App extends Component {
  state = {
    videoPlaying: false,
    videoToPlay: null,
    gradient1: 0xEE7171,
    gradient2: 0x7176EE,
    errorText: '',
  };

  constructor(props) {
    super(props);
  }

  getVideo = () => {
    this.setState({ videoPlaying: true });
    
    fetch('https://us-central1-unheardnoise.cloudfunctions.net/createnoise')
    .then(response => response.text())
    .then(data => {
      this.setState({ videoToPlay: data });
    })
    .catch(error => {
      console.log('Something went wrong. Please try again later.');
      this.setState({ errorText: 'Something went wrong. Please try again later.' });
    })
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={this.state.videoPlaying ? { ...styles.background, opacity: 1.0 } : styles.background} />

        <p style={this.state.videoPlaying ? { ...styles.title, color: '#71EEEE' } : styles.title}>
          UNHEARD NOISE
        </p>

        {this.state.videoPlaying && 
          <ReactPlayer
            url={this.state.videoToPlay ? `https://youtube.com/watch?v=${this.state.videoToPlay}` : null}
            playing={true}
            style={{ margin: 50, marginBottom: 100 }}
            controls={true}
          />
        }

        {this.state.errorText && 
          <p style={styles.error}>{this.state.errorText}</p>
        }
        <DiamondButton onClick={() => this.getVideo()}>
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
    letterSpacing: '14px',
    transition: '5s',
  },
  error: {
    color: 'black',
    borderRadius: '5px',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '16px',
  },
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: 100,
  },
  background: {
    width: '100%',
    height: '100%',
    opacity: 0.0,
    transition: '5s',
    backgroundImage: `linear-gradient(139.46deg, #EE7171 18.55%, #7176EE 100%)`,
    position: 'absolute',
    zIndex: -1,
  }
}