export const getTime = (timeSec) => {
  const min = ~~(timeSec / 60)
  const sec = timeSec % 60
  return ({
    min: min < 10 ? '0' + min : min,
    sec: sec < 10 ? '0' + sec : sec
  })
}
