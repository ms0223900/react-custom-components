export const getMinSec = (sec) => {
  const minutes = ~~(sec / 60)
  const remainSec = sec % 60
  const handleTimeString = (time) => (
    time < 10 ? '0' + time : time
  )
  return ({
    min: handleTimeString(minutes),
    sec: handleTimeString(remainSec),
    timeString: handleTimeString(minutes) + ' : ' + handleTimeString(remainSec),
  })
}
