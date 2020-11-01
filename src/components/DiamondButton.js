import React from 'react';

let styles = {
  labelStyle: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '36px',
  },
  labelStyleOver: {
    color: 'black',
    transition: '.3s'
  },
  labelStyleOut: {
    color: '#7176EE',
    transition: '.3s'
  },
  divStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    transition: '.3s',
    border: 'none',
    width: 350,
    marginHorizontal: '10px',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    height: 90,
  },
  divStyleOver: {
    backgroundColor: 'white',
    transition: '.3s',
  },
  divStyleOut: {
    backgroundColor: '#EE7171',
    transition: '.3s',
  }
}

class DiamondButton extends React.Component {
  state = {
    showBox: false
  };

  handleBoxToggle = () => this.setState({ showBox: !this.state.showBox });
  
  render() {
    return (
      <div
        onMouseEnter={this.handleBoxToggle}
        onMouseLeave={this.handleBoxToggle}
        className="cutCorners"
        style={{ width: 350, height: 90 }}
      >
        <button onClick={this.props.onClick} style={{ ...styles.divStyle, ...(this.state.showBox ? styles.divStyleOut : styles.divStyleOver) }}>
          <label style={{ ...styles.labelStyle, ...(this.state.showBox ? styles.labelStyleOut : styles.labelStyleOver) }}>
            {this.props.children}
          </label>
        </button>
      </div>
    );
  }
}

export default DiamondButton;