export const promisedValue = val => new Promise(res => {
  typeof(val) === 'function' ? res(val()) : res(val)
})


//match(number).equals(1).then('a').else('b') => promise
export const matchSwitch = (condition) => ({
  condition,
  equals(option) {
    return ({
      then: (val) => {
        return this.condition === option ? ({
          ...this,
          else: () => promisedValue(val)
        }) : this
      },
    })
  },
  else: val => {
    return promisedValue(val)
  },
})