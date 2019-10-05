const promisedValue = val => new Promise(res => {
  typeof(val) === 'function' ? res(val()) : res(val)
})

export const match = (condition) => ({
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