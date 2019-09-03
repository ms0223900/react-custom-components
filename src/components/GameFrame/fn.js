export const mergeItemCountShopLists = (data) => {
  const { shoplists, userbuylists, useremotelists } = data
  const userEmoteIdLists = useremotelists.map(emote => emote.emoteId)
  const newShopLists = [...shoplists]
  for (let i = 0; i < userbuylists.length; i++) {
    const { id, itemId, itemCount } = userbuylists[i]
    newShopLists[itemId - 1] = {
      ...newShopLists[itemId - 1],
      itemCount,
      userbuylistId: id,
    }
  }
  //from emote list
  for (let i = 0; i < newShopLists.length; i++) {
    const { emote } = newShopLists[i];
    if(emote) {
      const itemCountFromData = userEmoteIdLists.indexOf(emote.id) !== -1 ? 1 : 0
      newShopLists[i] = {
        ...newShopLists[i],
        emoteId: emote.id,
        itemCount: newShopLists[i].itemCount === 1 ? 1 : itemCountFromData,
      }
    }
    
  }
  return newShopLists
}

export const mergeEmoteLists = (apiUrl, userEmoteLists, emotes) => {
  const newEmoteLists = [...userEmoteLists]
  for (let i = 0; i < userEmoteLists.length; i++) {
    const { emoteId } = userEmoteLists[i]
    const targetEmote = emotes.find(emo => emo.id === emoteId)
    newEmoteLists[i] = {
      ...targetEmote,
      imgSrc: apiUrl + targetEmote.emoteImg.url,
    }
  }
  return newEmoteLists
}