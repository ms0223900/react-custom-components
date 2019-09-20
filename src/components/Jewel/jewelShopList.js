export const potionImgSrc = 'https://image.flaticon.com/icons/svg/129/129094.svg'
export const bombImgSrc = 'https://image.flaticon.com/icons/svg/2080/2080648.svg'
export const thunderImgSrc = 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/bolt-512.png'

export const allShopItems = {
  Potion: 'Potion',
  Bomb: 'Bomb',
  Thunder: 'Thunder',
}

export const jewelShopList_init = [
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
  {
    id: 2,
    itemName: 'Thunder', 
    itemPrice: 2000, 
    itemImgSrc: {
      url: thunderImgSrc
    },
    itemCount: 0,
    type: 'consumables', 
    isOnlyOne: false 
  },
]