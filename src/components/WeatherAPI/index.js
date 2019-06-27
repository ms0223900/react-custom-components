/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { 
  API,
  logo, 
} from './config'
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
  },
  weatherPage: {
    '& a': {
      margin: '10px',
      maxWidth: 300,
      display: 'inline-block',
      textAlign: 'center',
      padding: 10,
      boxShadow: '0px 0px 10px #ddd',
      textDecoration: 'none',
      color: '#345',
    },
    '& img': {
      // width: '100%',
      maxHeight: 120,
      display: 'inline-block',

    }
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
  const cityNow = match.params.city
  const api = API.filter(api => api.city === cityNow )[0]
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
    setLocNow(undefined)
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
          const { weatherElement, locationName, geocode } = loc
          const getData = (tempData) => {
            const latestData = getNearestTime(tempData.time).elementValue
            const time = getNearestTime(tempData.time).startTime || getNearestTime(tempData.time).dataTime
            const value = latestData[0].value
            const measures = latestData[0].measures
            return { value, measures, time }
          }
          const temp = weatherElement[3]
          const weatherDescp = weatherElement[6]
          const rain = weatherElement[7]
          const locationData = {
            pathname: `/weather/${ cityNow }/${ geocode }`,
            state: {
              temp,
              weatherDescp,
              rain,
            }
          }
          return (
            <div key={ i } className={ classes.weatherBlock }>
              <h3><Link to={ locationData }>{ `鄉鎮市: ${ locationName } ` }</Link></h3>
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

const WeatherMainPage = () => {
  const classes = useStyles()
  return (
    <div className={ classes.weatherPage }>
      <Link to={ '/weather/taichung' }>
        <img src={ logo.taichung } />
        <h3>TAICHUNG</h3>
      </Link>
      <Link to={ '/weather/tainan' }>
        <img src={ logo.tainan } />
        <h3>TAINAN</h3>
      </Link>
    </div>
  )
}

const TownWeatherInfo = ({ match, location }) => {
  console.log(match, location)
  return (
    <div>Hi{ match.params.town }</div>
  )
}


const Weather = ({ match }) => {
  console.log(match.url)
  return (
    <div>
      <h2>{ 'Weather' }</h2>
      <Route exact path={ `${ match.url }` } component={ WeatherMainPage } />
      <Route exact path={ `${ match.url }/:city` } component={ WeatherInfo } />
      <Route path={ `${ match.url }/:city/:town` } component={ TownWeatherInfo } />
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