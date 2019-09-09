export const jewelWidth = 50
export const jewelsPerRow = 5
export const emptyColor = 'transparent'
export const jewelColors = ['#0fafad', '#fa0', '#325ca8', '#a83271', '#b9d104']
export const specialJewelColors = {
  bombColor: '#ddd',
  thunderColor: '#ffd500',
}

export const singleJewelScore = 1000
export const scoreMagnification = (count) => {
  if(count > 6) {
    return 1.5
  } else {
    switch (count) {
    case 3:
      return 1
    case 4:
      return 1.1
    case 5:
      return 1.2
    case 6:
      return 1.3
    default:
      return 1
    }
  }
}
