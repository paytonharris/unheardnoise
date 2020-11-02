import React, { Component } from 'react';
import DiamondButton from './components/DiamondButton';

export default class App extends Component {
  state = {
    videoPlaying: null, // becomes a youtube link
    gradient1: 0xEE7171,
    gradient2: 0x7176EE,
  };

  constructor(props) {
    super(props);
  }

  // updateGradient = () => {
  //   this.setState({ gradient1: this.state.gradient1 - 10, gradient2: this.state.gradient2 + 10 })

  //   setTimeout(() => {
  //     this.updateGradient()
  //   }, 100)
  // }

  // componentDidMount() {
  //   this.updateGradient();
  // }

  render() {
    //console.log(`linear-gradient(139.46deg, #${this.state.gradient1.toString(16)} 18.55%, #${this.state.gradient2.toString(16)} 100%)`);

    return (
      <div style={styles.body}>
        <div style={this.state.videoPlaying ? // background
        //backgroundImage: `linear-gradient(139.46deg, #EE7171 18.55%, #7176EE 100%)`, 
        //backgroundImage: `linear-gradient(139.46deg, #${this.state.gradient1.toString(16)} 18.55%, #${this.state.gradient2.toString(16)} 100%)`,
        { ...styles.background,
          opacity: 1.0,
        } : 
          styles.background}/>

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
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)',
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