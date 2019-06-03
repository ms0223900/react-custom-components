import React, { 
  useEffect, 
  useState 
} from 'react'

// function getLocalFiles(path, fileFormat) {
//   // const req = require.context(path, false, fileFormat)
//   return require.context(path, false, fileFormat).keys()
// }

export default () => {
  const [ pics, setPics ] = useState([])
  useEffect(() => {
    // const pics = getLocalFiles('../../../public/data', /\.(jpe?g|png|gif|svg)$/i)
    const req = require.context('../../../public/data', false, /\.(jpe?g|png|gif|svg)$/i)
    // console.log(pics)
    setPics(req.keys())
  }, [])
  return (
    <div>
      {pics.length > 0 ? pics.map((pic, i) => (
        <img key={ i } src={ 'data/' + pic } />
      )) : 'loading...'}
    </div>
  )
}