import React, { Component } from 'react';
import DiamondButton from './components/DiamondButton';
import ReactPlayer from 'react-player'

let nextRed1 = 0;
let nextRed2 = 0;
let nextGreen1 = 0;
let nextGreen2 = 0;
let nextBlue1 = 0;
let nextBlue2 = 0;

let prevRed1 = 238;
let prevRed2 = 113;
let prevGreen1 = 113;
let prevGreen2 = 118;
let prevBlue1 = 113;
let prevBlue2 = 238;

export default class App extends Component {
  state = {
    videoPlaying: false,
    videoToPlay: null,
    red1: 238,
    red2: 113,
    green1: 113,
    green2: 118,
    blue1: 113,
    blue2: 238,
    errorText: '',
    width: 0,
    height: 0,
    gradientMoving: false,
  };

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  lerp(v0, v1, t) {
    return v0 * (1-t) + v1 * t;
  }

  startNextColor() {
    nextRed1 = this.getRandomInt(0, 255);
    nextRed2 = this.getRandomInt(0, 255);
    nextGreen1 = this.getRandomInt(0, 255);
    nextGreen2 = this.getRandomInt(0, 255);
    nextBlue1 = this.getRandomInt(0, 255);
    nextBlue2 = this.getRandomInt(0, 255);
    
    prevRed1 = this.state.red1;
    prevRed2 = this.state.red2;
    prevGreen1 = this.state.green1;
    prevGreen2 = this.state.green2;
    prevBlue1 = this.state.blue1;
    prevBlue2 = this.state.blue2;

    this.incrementColors(0, 250)
  }

  incrementColors(currentTick, finalTick) {
    if (currentTick === finalTick) {
      this.startNextColor();
    } else {
      const nextTick = currentTick + 1;

      const interpolatedRed1 = Math.round(this.lerp(prevRed1, nextRed1, currentTick / finalTick));
      const interpolatedRed2 = Math.round(this.lerp(prevRed2, nextRed2, currentTick / finalTick));
      const interpolatedGreen1 = Math.round(this.lerp(prevGreen1, nextGreen1, currentTick / finalTick));
      const interpolatedGreen2 = Math.round(this.lerp(prevGreen2, nextGreen2, currentTick / finalTick));
      const interpolatedBlue1 = Math.round(this.lerp(prevBlue1, nextBlue1, currentTick / finalTick));
      const interpolatedBlue2 = Math.round(this.lerp(prevBlue2, nextBlue2, currentTick / finalTick));

      this.setState({
        red1: interpolatedRed1 <= 255 ? interpolatedRed1 : 255,
        red2: interpolatedRed2 <= 255 ? interpolatedRed2 : 255,
        green1: interpolatedGreen1 <= 255 ? interpolatedGreen1 : 255,
        green2: interpolatedGreen2 <= 255 ? interpolatedGreen2 : 255,
        blue1: interpolatedBlue1 <= 255 ? interpolatedBlue1 : 255,
        blue2: interpolatedBlue2 <= 255 ? interpolatedBlue2 : 255,
      })

      setTimeout(() => this.incrementColors(nextTick, finalTick), 100);
    }
  }
  
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

    if (!this.state.gradientMoving) {
      setTimeout(() => {
        this.startNextColor();
        this.setState({ gradientMoving: true })
      }, 7000);
    }
    
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
        <div style={this.state.videoPlaying ?
          {
            ...styles.background,
            opacity: 1.0,
            backgroundImage: this.state.gradientMoving ? 
              `linear-gradient(139.46deg, rgb(${this.state.red1}, ${this.state.green1}, ${this.state.blue1}) 18.55%, rgb(${this.state.red2}, ${this.state.green2}, ${this.state.blue2}) 100%)` :
              `linear-gradient(139.46deg, #EE7171 18.55%, #7176EE 100%)`,
          } :
          styles.background}
        />

        <p style={this.state.videoPlaying
          ? 
            { ...styles.title,
              color: this.state.gradientMoving ? 
                `rgb(${-1 * (this.state.red1 - 255)}, ${-1 * (this.state.green1 - 255)}, ${-1 * (this.state.blue1 - 255)})` :
                '#71EEEE',
              fontSize: titleFontSize
            }
          : 
            { ...styles.title, fontSize: titleFontSize }
          }
        >
          UNHEARD NOISE
        </p>

        {this.state.videoPlaying && (
          this.state.videoToPlay ?
          <ReactPlayer
            url={this.state.videoToPlay ? `https://youtube.com/watch?v=${this.state.videoToPlay}` : null}
            playing={true}
            style={{
              margin: this.state.height < 710 ? 10 : 50,
              marginBottom: this.state.height < 710 ? 20 : 100,
              maxWidth: this.state.width
            }}
            controls={true}
            onEnded={() => this.getVideo()}
          />
          :
          <div style={{
            height: 300,
            width: 500,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: this.state.height < 710 ? 10 : 50,
            marginBottom: this.state.height < 710 ? 20 : 100,
            maxWidth: this.state.width,
            borderRadius: 10
          }} />
        )}

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