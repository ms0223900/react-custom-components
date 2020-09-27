/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { BrowserRouter as Router, Route, Link, MemoryRouter, useHistory } from 'react-router-dom'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import Star from '@material-ui/icons/StarRounded'
import { 
  API,
  logo, 
} from './config'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    '& button': {
      padding: 6,
      marginRight: 10,
    },
    '& a': { textDecoration: 'none', },
    '& li': {
      position: 'relative',
      display: 'inline-block',
      '&:hover, &.active': {
        backgroundColor: '#888',
      },
      '& a': {
        padding: 10,
        display: 'inline-block',
        width: '100%',
        color: props => props.linkColor,
      },
      '& ul': {
        display: 'none',
        backgroundColor: '#666',
        position: 'absolute',
        top: 40,
        left: 0,
        '& li': {
          display: 'block',
        },
      },
      '&:hover ul': {
        display: 'block',
      },
    }
  },
  breadCrumb: {
    minWidth: 100,
    maxWidth: 300,
    margin: '10px 0px',
    backgroundColor: '#add',
    color: '#111',
    padding: 6,
    height: 30,
    boxSizing: 'border-box',
    '& li': {
      display: 'inline-block',
    },
    '& a': {
      textDecoration: 'none',
      color: '#33ad',
    }
  },
  weatherBlock: {
    display: 'inline-block',
    verticalAlign: 'top',
    maxWidth: 'calc(33% - 30px)',
    margin: 10,
    padding: 6,
    '& a': {
      color: props => props.color,
    }
  },
  weatherPage: {
    '& a': {
      margin: '10px',
      width: 200,
      display: 'inline-block',
      textAlign: 'center',
      padding: 10,
      boxShadow: '0px 0px 10px #ddd',
      textDecoration: 'none',
      color: '#345',
      backgroundColor: '#fff',
    },
    '& img': {
      // width: '100%',
      maxHeight: 120,
      display: 'inline-block',
    }
  },
  townWeatherInfo: {
    display: 'inline-block', 
    width: '50%',
    padding: 10,
    boxSizing: 'border-box',
    '& span': {
      fontSize: 24,
      fontWeight: 300,
    }
  }
})
const theme = {
  light: {
    mainColor: {
      backgroundColor: '#fff',
      color: '#111',
    },
    reverseColor: {
      backgroundColor: '#333',
      color: '#eeefff',
    },
  },
  dark: {
    mainColor: {
      backgroundColor: '#333',
      color: '#eee',
    },
    reverseColor: {
      backgroundColor: '#fff',
      color: '#222',
    },
  }
}



const Home = () => <h2>HOME</h2>
const About = () => <h2>ABOUT</h2>

const CustomLink = ({ label, to, exact=false, style, ...props }) => { 
  return (
    <Route 
      path={ to }
      exact={ exact }
      children={({ match }) => { //when path is match, it is the match property from route component 
        return (
          <li className={ match ? 'sidebar-link active' : 'sidebar-link' }>
            <Link style={ style } to={ to }>{ label }</Link>
            { props.children }
          </li>
        )
      }}  />
  )
}

//
const Navbar = ({ themeTone, setThemeFn }) => {
  // const theme = useTheme() || theme
  const classes = useStyles({ 
    linkColor: theme[themeTone].reverseColor.color, 
  })
  const { backgroundColor: mainBg, color: mainColor } = theme[themeTone].mainColor
  const { backgroundColor: revBg, color: revColor } = theme[themeTone].reverseColor
  return (
    <nav style={{ backgroundColor: revBg }} className={ classes.navBar }>
      <ul>
        <CustomLink to={ '/' } label={ 'Home' } exact={ true } />
        <CustomLink to={ '/about' } label={ 'About' } />
        <CustomLink to={ '/weather' } label={ 'Weather' }>
          <ul>
            <li><Link to={ '/weather/taichung' }>{ 'Taichung' }</Link></li>
            <li><Link to={ '/weather/tainan' }>{ 'Tainan' }</Link></li>
          </ul>
        </CustomLink>
      </ul>
      <button style={{ backgroundColor: mainBg, color: mainColor  }} onClick={ setThemeFn }>{ themeTone }</button>
    </nav>
  )
}

//fn start
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
const fetchCityWeatherApi = (city, setFn, town=null) => {
  const api = API.filter(api => api.city === city )[0]
  fetch(api.api)
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      //如果有提供town則取得鄉鎮市，否則取得原本縣市資料
      const data = town ? 
        res.records.locations[0].location.filter(loc => loc.locationName === town) : 
        res
      setFn(data)
    })
    .catch(e => console.log(e))
}
const getData = (weatherEl) => {
  //取得最近時間的資料
  const latestData = getNearestTime(weatherEl.time).elementValue
  const time = getNearestTime(weatherEl.time).startTime || getNearestTime(weatherEl.time).dataTime
  //取得value
  const value = latestData[0].value
  //取得單位
  const measures = latestData[0].measures
  return { value, measures, time }
}
//轉換單位
const convertMeasures = (measure) => {
  switch (measure) {
  case '攝氏度' || '百分比':
    return '°C'
  case '百分比':
    return '%'
  case '公尺/秒':
  case '16方位':
    return measure
  default:
    return ''
  }
}
//fn end

const WeatherInfo = ({ match, location, themeTone='light' }) => {
  // const theme = useTheme()
  // console.log(match)
  const { backgroundColor, color } = theme[themeTone].mainColor
  const classes = useStyles({
    backgroundColor,
    color,
  })
  //city from match 的參數，像是: weather/tainan 的tainan
  const cityNow = match.params.city
  //
  const [weatherData, setData] = useState([])
  const [LSstaredData, setLSstaredData] = useState([])
  const [locNow, setLocNow] = useState(undefined)
  //rdr
  useEffect(() => {
    //從現在的city去fetch資料
    fetchCityWeatherApi(cityNow, setData)
    setLocNow(undefined)
  }, [match])
  useEffect(() => {
    const originData = JSON.parse(localStorage.getItem('staredTown')) || []
    setLSstaredData(originData)
  }, [])
  const handleSelect = (e) => {
    //透過select來拿到index, 以篩選某城鎮
    const { selectedIndex } = e.target
    setLocNow(selectedIndex)
  }
  const handleStarTownLink = (id, cityChineseName, cityNow, town, link) => {
    // console.log(cityChineseName, cityNow, town, link)
    const originData = JSON.parse(localStorage.getItem('staredTown')) || []
    const townId = cityNow + '-' + id
    const hasStared = originData.find(data => data.id === townId)
    let newData
    if(hasStared) {
      newData = originData.filter(data => data.id !== townId)
    } else {
      newData = [
        ...originData,
        { id: townId, cityChineseName, cityNow, town, link }
      ]
    }
    localStorage.setItem('staredTown', JSON.stringify(newData))
    setLSstaredData(newData)
  }
  //
  // console.log(weatherData)
  if(weatherData.length === 0) {
    //預設顯示loading
    return ( <h3>{ 'loading...' }</h3> )
  } else {
    //該縣市資料: data
    const data = weatherData.records.locations[0]
    //鄉鎮市資料: locData; 如果沒有選城鎮，則全部顯示，
    const locData = typeof(locNow) !== 'undefined' ? 
      [ data.location[locNow] ] : data.location
    const checkIsStared = (id) => LSstaredData.find(data => data.id === cityNow + '-' + id)
    return (
      <div>
        <BreadCrumb location={ location } />
        <h2>{ data.locationsName }
          <span>
            <select onChange={ handleSelect }>
              {/* 所有鄉鎮市的資料: data.location; */}
              {data.location.map((loc, i) => (
                <option key={ i } value={ i }>{ loc.locationName }</option>
              ))}
            </select>
          </span>
        </h2>
        <div>
          { locData.map((loc, i) => {
            //從locData取得相關天氣資料
            const { weatherElement, locationName, geocode } = loc
            const temp = weatherElement[3]
            const weatherDescp = weatherElement[6]
            const rain = weatherElement[7]
            const locationData = {
              pathname: `/weather/${ cityNow }/${ locationName }`,
              state: { temp, weatherDescp, rain, }
            }
            return (
              <div key={ i } className={ classes.weatherBlock }>
                <h3>
                  <Link to={ locationData }>{ `鄉鎮市: ${ locationName } ` }</Link>
                  {/* //用themeProvide來抓theme, star自己theme的相關東西會抓不到 */}
                  <Star 
                    style={{ 
                      fill: checkIsStared(i) ? '#0000f1' : '#aaa',
                      cursor: 'pointer',
                    }}
                    onClick={ handleStarTownLink.bind(this, i, data.locationsName, cityNow, locationName, `/weather/${ cityNow }/${ locationName }`, ) }>
                    { checkIsStared(i) ? '已收藏' : '收藏' } 
                  </Star>
                </h3>
                <hr />
                <h4>{ '最近天氣預測' }</h4>
                <p>{ temp.description }: <span>{ getData(temp).value }度</span></p>
                <p>{ weatherDescp.description }: <span>{ getData(weatherDescp).value  }</span></p>
                <p>{ rain.description }: <span>{ getData(rain).value }</span></p>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
  
}

const WeatherMainPage = ({ location }) => {
  const classes = useStyles()
  const staredData = JSON.parse(localStorage.getItem('staredTown')) || []
  return (
    <div className={ classes.weatherPage }>
      <BreadCrumb location={ location } />
      <div>
        <Link to={ '/weather/taichung' }>
          <img src={ logo.taichung } />
          <h3>TAICHUNG</h3>
        </Link>
        <Link to={ '/weather/tainan' }>
          <img src={ logo.tainan } />
          <h3>TAINAN</h3>
        </Link>
      </div>
      <div>
        <h3>{ '已收藏之城鎮' }</h3>
        {staredData.map(data => (
          <div key={ data.id }>
            <Link to={ data.link }>
              <h4>{ data.cityChineseName + ' ' + data.town }</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const TownWeatherInfo = ({ match, location }) => {
  // console.log(match, location)
  const classes = useStyles()
  const { city, town } = match.params
  const [townData, setTownData] = useState(undefined)
  // const [townName, ]
  useEffect(() => {
    fetchCityWeatherApi(city, setTownData, town)
  }, [match])
  //
  const onMatchRoutes = (matchRoutes) => ([
    ...matchRoutes,
    { route: 
      { 
        path: `/weather/${ city }/${ town }`, 
        breadCrumbName: town 
      }, 
    },
  ])
  // console.log(townData)
  //
  return (
    <div>
      <BreadCrumb location={ location } onMatchRoutes={ onMatchRoutes } />
      {/* Hi / { match.params.city } / { match.params.town } */}
      <div>
        {!townData ? 
          <h2>Loading...</h2> : (
            <div>
              <h2>{  town + ' 近三小時天氣概況' }</h2>
              {townData[0].weatherElement.map((el, i) => (
                <div key={ i } className={ classes.townWeatherInfo }>
                  <h4>{ el.description }: </h4>
                  <p>
                    <span>{ getData(el).value }</span>
                    { ' ' + convertMeasures( getData(el).measures ) } 
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
      </div> 
    </div>
  )
}

const Weather = ({ match, location, themeTone='light' }) => {
  // console.log(themeTone)
  return (
    <div style={{ padding: 10, }}>
      <h2>{ 'Weather' }</h2>
      <Route exact path={ `${ match.url }` } component={ WeatherMainPage } />
      <Route exact path={ `${ match.url }/:city` } render={ (routeProps) => <WeatherInfo themeTone={ themeTone } {...routeProps} /> } />
      {/* 鄉鎮市的資料參數從city 和 town取得 */}
      <Route path={ `${ match.url }/:city/:town` } component={ TownWeatherInfo } />
    </div>
  )
}

const routes = [
  { path: '/', component: Home, exact: true, }, 
  { path: '/about', component: About }, 
  { path: '/weather', component: Weather, breadCrumbName: '天氣', routes: [
    { path: '/weather/taichung', component: WeatherInfo, breadCrumbName: '台中' },
    { path: '/weather/tainan', component: WeatherInfo, breadCrumbName: '台南' },
  ] }, 
]

const BreadCrumb = ({ location, onMatchRoutes }) => {
  const classes = useStyles()
  const matchedRoutes = typeof(onMatchRoutes) === 'function' ? 
    onMatchRoutes( matchRoutes(routes, location.pathname) ) :
    matchRoutes(routes, location.pathname)
  // console.log(matchedRoutes)
  return (
    <nav className={ classes.breadCrumb }>
      <ol>
        { matchedRoutes.map((matchedRoute, i) => {
          const { path, breadCrumbName } = matchedRoute.route
          const isActive = path === location.pathname
          return isActive ? 
            (
              <li key={ i }>{ breadCrumbName } </li>
            ) : (
              <li key={ i }><Link to={ path }>{ breadCrumbName } / </Link></li>
            )
        }) }
      </ol>
    </nav>
  )
}


const Main = ({ themeTone }) => {
  // const theme = useTheme()
  const { backgroundColor: mainBg, color: mainColor } = theme[themeTone].mainColor
  const { backgroundColor: revBg, color: revColor } = theme[themeTone].reverseColor

  return (
    <div style={{ minHeight: '100vh', backgroundColor: mainBg, color: mainColor }}>
      { renderRoutes(routes) }
      {/* <Route exact path={ '/' } component={ Home } />
      <Route path={ '/about' } component={ About } />
      <Route 
        path={routes[2].path} 
        render={ (routeProps) => (
          <Weather themeTone={ themeTone } {...routeProps} />
        )} /> */}
    </div>
  )
}


export default () => {
  const [themeTone, setThemeTone] = useState('light')
  const handleSetThemeTone = () => {
    if(themeTone === 'light') {
      setThemeTone('dark')
    } else {
      setThemeTone('light')
    }
  }
  return (
    <MemoryRouter initialEntries={['/weather']}>
      {/* <Router> */}
      <Navbar themeTone={ themeTone } setThemeFn={ handleSetThemeTone } />
      <Main themeTone={ themeTone } />
      {/* </Router> */}
    </MemoryRouter>
  )
}