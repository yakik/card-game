


export function getCardsForPlayer(oldPack) {
  let pack = oldPack.slice()
  let cards = []
  for (let u = 0; u < 10; u++)
    cards.push(pack.pop())
  cards = cards.sort(function (a, b) { return a.number - b.number })
  return { cards: cards, pack: pack }
}




export function getShuffledPack(pack){
  let newPack = [...pack]
  for (let f = 0; f < 300; f++) {
    let cardIndexA = Math.round(Math.random() * (newPack.length - 1))
    let cardIndexB = Math.round(Math.random() * (newPack.length - 1))
    let p = newPack[cardIndexA]
    newPack[cardIndexA] = newPack[cardIndexB]
    newPack[cardIndexB] = p
    f = f + 1
  }
  return newPack
}

