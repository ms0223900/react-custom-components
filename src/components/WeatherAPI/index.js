/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { API } from './config'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  navBar: {
    '& li': {
      display: 'inline-block',
      '& a': {
        color: '#fff',
      }
    }
  },
  weatherBlock: {
    maxWidth: 400,
    margin: 10,
    padding: 6,
  }
})


const Navbar = () => {
  const classes = useStyles()
  return (
    <nav className={ classes.navBar }>
      <ul>
        <li><Link to={ '/' }>{ 'Home' }</Link></li> /
        <li><Link to={ '/about' }>{ 'About' }</Link></li> /
        <li>
          <Link to={ '/weather' }>{ 'Weather' }</Link> /
          <ul>
            <li><Link to={ '/weather/taichung' }>{ 'Taichung' }</Link></li>
            <li><Link to={ '/weather/tainan' }>{ 'Tainan' }</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

const getNearestTime = (timeArr) => {
  const timeNow = new Date()
  let minTimeDiff = Infinity
  let minTimeDiffPos = 0
  for (let i = 0; i < timeArr.length; i++) {
    const time = new Date(timeArr[i].dataTime || timeArr[i].startTime)
    const timeDiff = Math.abs(time - timeNow)
    if(timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff
      minTimeDiffPos = i
    }
  }
  return timeArr[minTimeDiffPos]
}

const WeatherInfo = ({ match }) => {
  // console.log(match)
  const classes = useStyles()
  const api = API.filter(api => api.city === match.params.city )[0]
  const [weatherData, setData] = useState([])
  const [locNow, setLocNow] = useState(undefined)
  useEffect(() => {
    fetch(api.api)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        setData(res)
      })
      .catch(e => console.log(e))
  }, [match])
  const handleSelect = (e) => {
    const { selectedIndex } = e.target
    setLocNow(selectedIndex)
  }
  //
  console.log(weatherData)
  if(weatherData.length === 0) {
    //loading
    return ( <h3>{ 'loading...' }</h3> )
  } else {
    const data = weatherData.records.locations[0]
    const locData = typeof(locNow) !== 'undefined' ? 
      [ data.location[locNow] ] : data.location
    return (
      <div>
        <h2>{ data.locationsName }
          <span>
            <select onChange={ handleSelect }>
              {data.location.map((loc, i) => (
                <option key={ i } value={ i }>{ loc.locationName }</option>
              ))}
            </select>
          </span>
        </h2>
        
        { locData.map((loc, i) => {
          const { weatherElement, locationName } = loc
          const temp = weatherElement[3]
          const getData = (tempData) => {
            const latestData = getNearestTime(tempData.time).elementValue
            const time = getNearestTime(tempData.time).startTime || getNearestTime(tempData.time).dataTime
            const value = latestData[0].value
            const measures = latestData[0].measures
            return { value, measures, time }
          }
          const weatherDescp = weatherElement[6]
          const rain = weatherElement[7]
          return (
            <div key={ i } className={ classes.weatherBlock }>
              <h3>{ `鄉鎮市:${ locationName } ` }</h3>
              <hr />
              <h4>{ '最近天氣預測' }</h4>
              <p>{ temp.description }: <span>{ getData(temp).value }度</span></p>
              <p>{ weatherDescp.description }: <span>{ getData(weatherDescp).value  }</span></p>
              <p>{ rain.description }: <span>{ getData(rain).value }</span></p>
            </div>
          )
        }) }
      </div>
    )
  }
  
}

const Weather = () => {
  return (
    <div>
      <h2>{ 'Weather' }</h2>
      <Route  path={ '/weather/:city' } component={ WeatherInfo } />
    </div>
  )
}

const Main = () => {
  return (
    <div>
      <Route exact path={ '/' } component={ () => <h2>HOME</h2> } />
      <Route path={ '/about' } component={ () => <h2>ABOUT</h2> } />
      <Route path={ '/weather' } component={ Weather } />
    </div>
  )
}


export default () => (
  <Router>
    <Navbar />
    <Main />
    {/* <Weather /> */}
  </Router>
)