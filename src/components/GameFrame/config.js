export const goldenSuitImgSrc = 'https://previews.123rf.com/images/ahasoft2000/ahasoft20001802/ahasoft2000180204219/94894181-spades-suit-golden-digital-coin-icon-vector-style-is-a-gold-yellow-flat-coin-cryptocurrency-symbol-.jpg'
export const treasureChestImgSrc = 'https://c8.alamy.com/comp/P68281/gold-treasure-chest-flat-icon-game-item-illustration-P68281.jpg'
export const mushRoomImgSrc = 'https://cdn2.iconfinder.com/data/icons/video-game-color-line/48/video_game_pixel_perfect_color_line_icons_20-mushroom-512.png'
export const diceImgSrc = 'http://files.softicons.com/download/game-icons/brain-games-icons-by-quizanswers/png/512x512/Board-Games.png'
//
export const potionImgSrc = 'https://image.flaticon.com/icons/svg/129/129094.svg'
export const bombImgSrc = 'https://image.flaticon.com/icons/svg/2080/2080648.svg'

export const initLevelData = (levelCount) => (
  [...Array(levelCount).keys()].map(lvl => ({
    id: lvl,
    level: lvl + 1,
    star: 0
  }))
)

export const shopData_mockData = [
  {
    id: 0,
    itemName: 'Golden Suit', 
    itemPrice: 2000, 
    itemImgSrc: {
      url: goldenSuitImgSrc
    } ,
    itemBought: 0,
    type: 'consumables', 
    isOnlyOne: true 
  },
  {
    id: 1,
    itemName: 'Treasure Chest', 
    itemPrice: 99999, 
    itemImgSrc: {
      url: treasureChestImgSrc
    },
    itemBought: 1,
    type: 'consumables', 
    isOnlyOne: true 
  },
  {
    id: 2,
    itemName: 'Mushroom', 
    itemPrice: 200, 
    itemImgSrc: {
      url: mushRoomImgSrc
    },
    itemBought: 5,
    type: 'consumables', 
    isOnlyOne: false, 
  },
  {
    id: 3,
    itemName: 'Dice', 
    itemPrice: 900, 
    itemImgSrc: {
      url: diceImgSrc
    },
    itemBought: 0,
    type: 'consumables', 
    isOnlyOne: true 
  },
]

//test for jewel game


export const shopList_init = [
  {
    id: 0,
    itemName: 'Potion', 
    itemPrice: 200, 
    itemImgSrc: {
      url: potionImgSrc
    } ,
    itemCount: 10,
    type: 'consumables', 
    isOnlyOne: false 
  },
  {
    id: 1,
    itemName: 'Bomb', 
    itemPrice: 1000, 
    itemImgSrc: {
      url: bombImgSrc
    },
    itemCount: 10,
    type: 'consumables', 
    isOnlyOne: false 
  },
]
