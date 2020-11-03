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
    width: 0,
    height: 0
  };
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  constructor(props) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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
    const titleFontSize = this.state.width < 600 ? '30px' : '48px';

    return (
      <div style={styles.body}>
        <div style={this.state.videoPlaying ? { ...styles.background, opacity: 1.0 } : styles.background} />

        <p style={this.state.videoPlaying
          ? 
            { ...styles.title, color: '#71EEEE', fontSize: titleFontSize }
          : 
            { ...styles.title, fontSize: titleFontSize }
          }
        >
          UNHEARD NOISE
        </p>

        {this.state.videoPlaying && 
          <ReactPlayer
            url={this.state.videoToPlay ? `https://youtube.com/watch?v=${this.state.videoToPlay}` : null}
            playing={true}
            style={{
              margin: this.state.height < 710 ? 10 : 50,
              marginBottom: this.state.height < 710 ? 20 : 100,
              maxWidth: this.state.width
            }}
            controls={true}
          />
        }

        {this.state.errorText && 
          <p style={styles.error}>{this.state.errorText}</p>
        }
        <DiamondButton screenWidth={this.state.width} onClick={() => this.getVideo()}>
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