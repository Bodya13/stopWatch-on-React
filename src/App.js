import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      startOrStop: 'start',
      timerId: null,
    };
  }


  handleStartOrStop() {
    let hours = this.state.hours;
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    let timerId = this.state.timerId;

    if (this.state.startOrStop === 'start') {
      this.setMyInterval(timerId, hours, minutes, seconds);
      this.setState({
        startOrStop: 'stop'
      })
    } else {
      this.clearMyInterval(timerId)
      this.setState({
        startOrStop: 'start'
      })
    }
  }

  setMyInterval(timerId, hours, minutes, seconds) {
    timerId  = setInterval(() => {
      if (seconds < 59) {
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }

      if(minutes === 60) {
        hours++;
        minutes = 0;
      }

      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        timerId: timerId,
      })
    }, 1000);
  }

  clearMyInterval(timerId) {
    clearInterval(timerId);
    let hours = 0;
    let minutes = 0;
    let seconds = 0

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    })

    return [hours, minutes, seconds]
  }

  handleReset() {
    let timerId = this.state.timerId;
  
    const [hours, minutes, seconds] = this.clearMyInterval(timerId);
    this.setMyInterval(timerId, hours, minutes, seconds);

    this.setState({
      startOrStop: 'stop'
    })
  }

  render() {
    let timerId = this.state.timerId;
    let clicks = [];
    let timeout;

    let handleWait = () => {
      clicks.push(new Date().getTime());
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300) {
          clearTimeout(timerId);
          this.setState({
            startOrStop: 'start'
          })
        }
      }, 300);
    }

    return (
    <div className="container">
      <div className="stopWatch">
        {this.state.hours < 10 ? '0'+ this.state.hours : this.state.hours}:
        {this.state.minutes < 10 ? '0'+ this.state.minutes : this.state.minutes}:
        {this.state.seconds < 10 ? '0'+ this.state.seconds : this.state.seconds}</div>
      <div className="buttons">
        <button onClick={() => this.handleStartOrStop()}>
          {this.state.startOrStop === 'start' ? 'Start' : 'Stop'}
        </button>
        <button onClick={() => handleWait()}>Wait</button>
        <button onClick={() => this.handleReset()}>Reset</button>
      </div>
    </div>
  )}
}
export default App;