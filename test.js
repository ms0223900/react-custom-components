const { performance } = require('perf_hooks')

/* eslint-disable no-unused-vars */
function memoize(fn) {
  const res = {} //cache in this function!
  return (...args) => {
    const argsKey = JSON.stringify(args)
    if(!res[argsKey]) {
      res[argsKey] = fn(...args)
    }
    console.log(res)
    return res[argsKey]
  }
}

const doubleCount = num => {
  let total = 0
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      total++
    }
  }
  return total
}

const count_memo = memoize(doubleCount)

const start = performance.now()
count_memo(40000)
console.log(performance.now() - start)
//
const start2 = performance.now()
count_memo(4000)
console.log(performance.now() - start2)