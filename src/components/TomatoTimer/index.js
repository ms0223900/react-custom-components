import React from 'react'
import Timer from './Timer'
import TimeButton from './TimeButton'

// const defaultWorkTime = 25 * 60
// const defaultBreakTime = 5 * 60

class TomatoTimer extends React.Component {
  state = {
    time: {
      workTime: 37,
      breakTime: 3,
    },
    workOrBreak: 'work',
    isPause: true,
  }
  _handleSetPause = () => {
    this.setState(state => ({
      isPause: !state.isPause,
    }))
  }
  _handleSetWorkBreak = () => {
    this.setState(state => ({
      workOrBreak: state.workOrBreak === 'work' ? 'break' : 'work'
    }))
  }
  _handleSetTime = (setWorkOrBreak, addMinus) => {
    const { time } = this.state
    const originTime = setWorkOrBreak === 'work' ?time.workTime : time.breakTime
    const newTime = 
      addMinus === 'add' ? originTime + 60 : 
      (originTime - 60 < 0 ? 0 : originTime - 60)
    this.setState({
      time: setWorkOrBreak === 'work' ? {
        ...time,
        workTime: newTime,
      } : {
        ...time,
        breakTime: newTime
      }
    })
  }
  //
  render() {
    const { isPause, workOrBreak, time } = this.state
    const totalTime = workOrBreak === 'work' ? time.workTime : time.breakTime
    return (
      <div>
        <h2>{ 'Tomato Timer' }</h2>
        <Timer
          workOrBreak={ workOrBreak }
          totalTime={ totalTime }
          isPause={ isPause } 
          setWorkBreak={ this._handleSetWorkBreak }
          setPausePlay={ this._handleSetPause } />
        <TimeButton 
          workOrBreak={ 'work' }
          setTimeFn={ this._handleSetTime }
          time={ time.workTime } />
        <TimeButton 
          workOrBreak={ 'break' }
          setTimeFn={ this._handleSetTime }
          time={ time.breakTime } />
      </div>
    );
  }
}

export default TomatoTimer